import express from "express";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import { limiter } from "./utils/rate-limiter.js";
import cors from "cors";

config();
const app = express();

//middlewares
app.use(
  cors({
    origin: "https://ai-chatbot-mern-u8g3.onrender.com",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use(limiter);
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/api/v1", appRouter);

export default app;
