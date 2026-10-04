const Menu = require("../models/Menu");

// ========================================
// GET ALL MENU ITEMS
// ========================================

const getMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: menuItems.length,
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu items",
      error: error.message,
    });
  }
};

// ========================================
// GET SINGLE MENU ITEM
// ========================================

const getMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch menu item",
      error: error.message,
    });
  }
};

// ========================================
// CREATE MENU ITEM
// ========================================

const createMenuItem = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      image,
      featured,
      available,
    } = req.body;

    const menuItem = await Menu.create({
      name,
      category,
      description,
      price,
      image,
      featured,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Menu item created successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create menu item",
      error: error.message,
    });
  }
};

// ========================================
// UPDATE MENU ITEM
// ========================================

const updateMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item updated successfully",
      data: menuItem,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update menu item",
      error: error.message,
    });
  }
};

// ========================================
// DELETE MENU ITEM
// ========================================

const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.findByIdAndDelete(
      req.params.id
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete menu item",
      error: error.message,
    });
  }
};

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};