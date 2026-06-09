import express from "express";

import protect from "../middleware/authMiddleware.js";

import admin from "../middleware/adminMiddleware.js";

import {
  getAdminAnalytics,
  getAllUsers,
  deleteUser,
  blockUser,
  unblockUser,
  getAllSessions,
  getAllConnections,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/analytics", protect, admin, getAdminAnalytics);

router.get("/users", protect, admin, getAllUsers);

router.delete("/users/:id", protect, admin, deleteUser);

router.put("/users/block/:id", protect, admin, blockUser);

router.put("/users/unblock/:id", protect, admin, unblockUser);

router.get("/sessions", protect, admin, getAllSessions);

router.get("/connections", protect, admin, getAllConnections);

export default router;
