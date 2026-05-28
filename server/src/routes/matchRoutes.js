import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  sendMatchRequest,
  getReceivedRequests,
  respondToMatchRequest,
  getAcceptedMatches,
  markRequestsSeen,
  removeConnection,
} from "../controllers/matchController.js";

const router = express.Router();

router.post("/send", protect, sendMatchRequest);

router.get("/received", protect, getReceivedRequests);

router.put("/respond", protect, respondToMatchRequest);

router.get("/connected", protect, getAcceptedMatches);

router.put("/seen", protect, markRequestsSeen);

router.delete("/:matchId", protect, removeConnection);

export default router;
