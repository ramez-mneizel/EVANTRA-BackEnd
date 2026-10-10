import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import {
  createEvent, getAllEvents, getEventById,
  updateEvent, deleteEvent, reviewEvent,
  getAllEventsForManagement
} from "../controllers/eventControllers.js";

const router = express.Router();

router.get("/", getAllEvents);
router.get("/management", protect, authorize("admin", "moderator"), getAllEventsForManagement);
router.get("/:id", getEventById);

router.post("/", protect, authorize("admin"), createEvent);
router.put("/:id", protect, authorize("admin"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);

router.put("/:id/review", protect, authorize( "admin" ,"moderator"), reviewEvent);

export default router;