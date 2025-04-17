import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.MODE === "production" ? true : ["http://localhost:5173"],
  },
});

const onlineUsers = new Map();

export function getSocketIdFromUserId(userId) {
  userId = String(userId); // convert to string cuz we might be dealing with object ids
  return onlineUsers.get(userId);
}

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log(`User ${userId} connected on socket ${socket.id}`);

  // add user id to onlineUsers and emit (emit - broadcast)
  onlineUsers.set(userId, socket.id);
  io.emit("getOnlineUsers", [...onlineUsers.keys()]);

  // disconnect, remove user id form onlineUsers and emit
  socket.on("disconnect", () => {
    console.log(`User disconnected from socket ${socket.id}`);
    onlineUsers.delete(userId);
    io.emit("getOnlineUsers", [...onlineUsers.keys()]);
  });
});

export { app, server, io };
