const express = require("express");

const {
  sendCustomerAutoReply,
} = require("../services/emailService");

const router = express.Router();

// ========================================
// CONTACT FORM
// ========================================

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      message,
    } = req.body;

    // ========================================
    // VALIDATION
    // ========================================

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and message are required.",
      });
    }

    // ========================================
    // SEND AUTOMATIC EMAIL
    // ========================================

    await sendCustomerAutoReply({
      customerEmail: email,
      customerName: name,
    });

    // ========================================
    // RESPONSE
    // ========================================

    return res.status(200).json({
      success: true,
      message:
        "Message received successfully. A confirmation email has been sent.",
    });
  } catch (error) {
    console.error(
      "Contact form error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to process your message right now. Please try again later.",
    });
  }
});

module.exports = router;