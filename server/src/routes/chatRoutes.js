import express from "express";

import protect from "../middleware/authMiddleware.js";

import { getMessages, saveMessage } from "../controllers/chatController.js";

const router = express.Router();

router.post("/send", protect, saveMessage);
router.get("/:userId", protect, getMessages);

export default router;
