import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { Content, GoogleGenerativeAI, Part } from "@google/generative-ai";

interface ChatMessage {
  role: string;
  content: string;
}

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  const user = await User.findById(res.locals.jwtData.id);
  try {
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    const chats: Content[] = user.chats.map((chat: ChatMessage) => ({
      role: chat.role,
      parts: [{ text: chat.content }] as Part[],
    }));

    chats.push({ parts: [{ text: message }], role: "user" });

    const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
    );
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const chat = model.startChat({
      history: chats,
    });

    let result = await chat.sendMessage(`${message}`);
    const botresponse = result.response.text();
    chats.push({ parts: [{ text: botresponse }], role: "model" });

    user.chats.push({ content: message, role: "user" });
    user.chats.push({ content: botresponse, role: "model" });

    console.log(chats);

    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getchats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(res.locals.jwtData.id);
  try {
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }

    return res.status(200).json({ message: "OK", chats: user.chats });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};

export const handledelete = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = await User.findById(res.locals.jwtData.id);
  try {
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not registered or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    //@ts-ignore
    user.chats = [];
    await user.save();
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: error.message });
  }
};
