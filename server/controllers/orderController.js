const Order = require("../models/Order");
const Menu = require("../models/Menu");

// ========================================
// CREATE ORDER
// ========================================

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      service,
      address,
      note,
      items,
    } = req.body;

    // ----------------------------------------
    // VALIDATE CUSTOMER
    // ----------------------------------------

    if (!customer?.name || !customer?.phone) {
      return res.status(400).json({
        success: false,
        message: "Customer name and phone are required",
      });
    }

    // ----------------------------------------
    // VALIDATE SERVICE
    // ----------------------------------------

    if (!["Pickup", "Delivery"].includes(service)) {
      return res.status(400).json({
        success: false,
        message: "Service must be Pickup or Delivery",
      });
    }

    if (service === "Delivery" && !address) {
      return res.status(400).json({
        success: false,
        message: "Delivery address is required",
      });
    }

    // ----------------------------------------
    // VALIDATE ITEMS
    // ----------------------------------------

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your order must contain at least one item",
      });
    }

    // ----------------------------------------
    // BUILD ORDER ITEMS
    // ----------------------------------------

    const orderItems = [];

    for (const item of items) {
      const menuItemId = item.menuItem || item._id;

      const menuItem = await Menu.findById(menuItemId);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item not found: ${item.name || menuItemId}`,
        });
      }

      if (!menuItem.available) {
        return res.status(400).json({
          success: false,
          message: `${menuItem.name} is currently unavailable`,
        });
      }

      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity < 1) {
        return res.status(400).json({
          success: false,
          message: `Invalid quantity for ${menuItem.name}`,
        });
      }

      orderItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity,
        image: menuItem.image,
      });
    }

    // ----------------------------------------
    // CALCULATE TOTAL ON SERVER
    // ----------------------------------------

    const total = orderItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );

    // ----------------------------------------
    // CREATE ORDER
    // ----------------------------------------

    const order = await Order.create({
      customer: {
        name: customer.name,
        phone: customer.phone,
      },

      service,

      address:
        service === "Delivery"
          ? address
          : "",

      note: note || "",

      items: orderItems,

      total,
    });

    // ----------------------------------------
    // RESPONSE
    // ----------------------------------------

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// ========================================
// GET ALL ORDERS
// ========================================

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.menuItem")
      .sort({
        createdAt: -1,
      });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE ORDER
// ========================================

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(
      req.params.id
    ).populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE ORDER STATUS
// ========================================

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Ready",
      "Completed",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      data: order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
};