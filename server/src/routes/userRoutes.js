import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", protect, getAllUsers);

router.get("/profile", protect, getUserProfile);

router.put("/profile", protect, updateUserProfile);

router.get("/:id", protect, getUserById);

export default router;
