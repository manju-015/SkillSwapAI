import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createSession,
  getMySessions,
  updateSessionStatus,
} from "../controllers/sessionController.js";

const router = express.Router();

router.post("/create", protect, createSession);

router.get("/my", protect, getMySessions);

router.put("/status", protect, updateSessionStatus);

export default router;
