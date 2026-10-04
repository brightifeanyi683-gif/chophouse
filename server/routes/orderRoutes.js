const express = require("express");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
  PUBLIC
  Customers need this route to place orders.
*/
router.post("/", createOrder);

/*
  ADMIN ONLY
*/
router.get("/", protect, getOrders);

router.get("/:id", protect, getOrder);

router.patch("/:id/status", protect, updateOrderStatus);

module.exports = router;