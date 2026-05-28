import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createReview,
  getUserReviews,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/create", protect, createReview);

router.get("/:userId", protect, getUserReviews);

export default router;
