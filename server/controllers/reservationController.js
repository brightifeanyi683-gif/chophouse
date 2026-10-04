const Reservation = require("../models/Reservation");

// ========================================
// CREATE RESERVATION
// ========================================

const createReservation = async (req, res) => {
  try {
    const {
      name,
      phone,
      date,
      time,
      guests,
      request,
    } = req.body;

    if (!name || !phone || !date || !time || !guests) {
      return res.status(400).json({
        success: false,
        message:
          "Name, phone, date, time and number of guests are required.",
      });
    }

    const reservation = await Reservation.create({
      customer: {
        name: name.trim(),
        phone: phone.trim(),
      },

      date: date.trim(),
      time: time.trim(),
      guests: guests.trim(),
      request: request?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Reservation request received successfully.",
      data: reservation,
    });
  } catch (error) {
    console.error("Create reservation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to create reservation.",
    });
  }
};


// ========================================
// GET ALL RESERVATIONS
// ========================================

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: reservations,
    });
  } catch (error) {
    console.error("Get reservations error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch reservations.",
    });
  }
};


// ========================================
// GET SINGLE RESERVATION
// ========================================

const getReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(
      req.params.id
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.error("Get reservation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch reservation.",
    });
  }
};


// ========================================
// UPDATE RESERVATION STATUS
// ========================================

const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Cancelled",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid reservation status.",
      });
    }

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation status updated successfully.",
      data: reservation,
    });
  } catch (error) {
    console.error(
      "Update reservation status error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Unable to update reservation status.",
    });
  }
};


// ========================================
// DELETE RESERVATION
// ========================================

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(
      req.params.id
    );

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Reservation deleted successfully.",
    });
  } catch (error) {
    console.error("Delete reservation error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to delete reservation.",
    });
  }
};


module.exports = {
  createReservation,
  getReservations,
  getReservation,
  updateReservationStatus,
  deleteReservation,
};