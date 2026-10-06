import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getAllUsers, updateUserRole, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);
router.put("/:id/role", protect, authorize("admin"), updateUserRole);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;