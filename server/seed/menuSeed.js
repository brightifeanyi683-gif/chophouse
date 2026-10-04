const fs = require("fs");
const path = require("path");
const vm = require("vm");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Menu = require("../models/Menu");

dotenv.config();

// ========================================
// LOAD FRONTEND MENU DATA
// ========================================

const menuDataPath = path.join(
  __dirname,
  "../../src/data/menuData.js"
);

const source = fs.readFileSync(
  menuDataPath,
  "utf8"
);

// Remove the ES module export statement
const cleanSource = source.replace(
  /export default menuData;\s*$/,
  ""
);

// Execute the existing menuData.js
const context = {};

vm.createContext(context);

vm.runInContext(
  `${cleanSource}\nthis.menuData = menuData;`,
  context
);

const menuData = context.menuData;

// ========================================
// SEED DATABASE
// ========================================

const seedMenu = async () => {
  try {
    await connectDB();

    console.log(
      `Found ${menuData.length} menu items to import.`
    );

    // Update existing items or create new ones
    const operations = menuData.map((item) => ({
      updateOne: {
        filter: {
          name: item.name,
        },

        update: {
          $set: {
            name: item.name,
            category: item.category,
            description: item.description,
            price: item.price,
            image: item.image,
            featured: item.featured || false,
            available: true,
          },
        },

        upsert: true,
      },
    }));

    const result = await Menu.bulkWrite(
      operations
    );

    console.log(
      `Menu import completed successfully.`
    );

    console.log(
      `Inserted: ${result.upsertedCount}`
    );

    console.log(
      `Updated: ${result.modifiedCount}`
    );

    process.exit(0);
  } catch (error) {
    console.error(
      "Menu import failed:",
      error.message
    );

    process.exit(1);
  }
};

seedMenu();