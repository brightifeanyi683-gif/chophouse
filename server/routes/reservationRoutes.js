const express = require("express");

const {
  createReservation,
  getReservations,
  getReservation,
  updateReservationStatus,
  deleteReservation,
} = require("../controllers/reservationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();


// Public
router.post("/", createReservation);


// Protected admin routes
router.get("/", protect, getReservations);

router.get("/:id", protect, getReservation);

router.patch(
  "/:id/status",
  protect,
  updateReservationStatus
);

router.delete(
  "/:id",
  protect,
  deleteReservation
);


module.exports = router;