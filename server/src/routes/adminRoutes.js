import express from "express";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";

import {
  getAdminAnalytics,
  getAllUsers,
  deleteUser,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/analytics", protect, admin, getAdminAnalytics);

router.get("/users", protect, admin, getAllUsers);

router.delete("/users/:id", protect, admin, deleteUser);

export default router;
