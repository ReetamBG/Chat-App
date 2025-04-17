import express from "express";
import { app, server, io } from "./configs/socket.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";

import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve(); 
// will give us the path of the backend folder
// or basically from where we run npm run start

// const app = express();
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" ? true : "http://localhost:5173",
    credentials: true, // allow cookies
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => res.send("Hello"));

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")))
  app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"))
  })
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
