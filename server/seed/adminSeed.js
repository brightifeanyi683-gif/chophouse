const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "brightifeanyi683@gmail.com";
    const adminPassword = "AdminCHOPH22#!";

    const existingAdmin = await Admin.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      12
    );

    await Admin.create({
      name: "CHOPHOUSE Admin",
      email: adminEmail,
      password: hashedPassword,
    });

    console.log("=================================");
    console.log("CHOPHOUSE ADMIN CREATED");
    console.log("=================================");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error(
      "Admin seed error:",
      error.message
    );

    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createAdmin();