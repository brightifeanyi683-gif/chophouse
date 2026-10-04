const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const menuRoutes = require("./routes/menuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ========================================
// DATABASE
// ========================================

connectDB();

// ========================================
// MIDDLEWARE
// ========================================

app.use(cors());
app.use(express.json());

// ========================================
// ROUTES
// ========================================

// Menu API
app.use("/api/menu", menuRoutes);

// Orders API
app.use("/api/orders", orderRoutes);

// Reservations API
app.use("/api/reservations", reservationRoutes);

// Authentication API
app.use("/api/auth", authRoutes);

// Contact / Email API
app.use("/api/contact", contactRoutes);

// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CHOPHOUSE API is running",
  });
});

// ========================================
// START SERVER
// ========================================

app.listen(PORT, () => {
  console.log(
    `CHOPHOUSE server running on port ${PORT}`
  );
});