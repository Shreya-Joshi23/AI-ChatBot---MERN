import { Router } from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { generateChatCompletion, getchats, handledelete } from "../controllers/chat-controllers.js";

const chatRoutes = Router();
//Protected API
chatRoutes.post("/new", validate(chatCompletionValidator), verifyToken,generateChatCompletion);
chatRoutes.get("/userchats",verifyToken,getchats);
chatRoutes.post("/deletechats",verifyToken,handledelete);

export default chatRoutes;
