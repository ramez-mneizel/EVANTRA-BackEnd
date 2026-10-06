import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createBooking, getMyBookings, cancelBooking, getAllBookings
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.get("/", protect, authorize("admin"), getAllBookings);

export default router;