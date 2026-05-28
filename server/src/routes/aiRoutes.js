import express from "express";

import protect from "../middleware/authMiddleware.js";

import { createStudyPlan } from "../controllers/aiController.js";

const router = express.Router();

router.post("/generate", protect, createStudyPlan);

export default router;
