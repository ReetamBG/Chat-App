import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getConversation, getUsers, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsers);
router.get("/get-conversation/:id", protectRoute, getConversation);
router.post("/send-message/:id", protectRoute, sendMessage)

export default router;
