import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js"
import cors from "cors"

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json({limit: "5mb"}));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true // allow cookies
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes)

app.get("/", (req, res) => res.send("Hello"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
