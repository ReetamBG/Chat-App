import cloudinary from "../configs/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import { getSocketIdFromUserId, io } from "../configs/socket.js";

// fetch all users excluding logged in user (i.e themself)
export const getUsers = async (req, res) => {
  try {
    const myId = req.user._id;
    const users = await User.find({ _id: { $ne: myId } }).select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
    console.log(`Error in getUsers controller: ${error}`);
  }
};

// get convo with the current user and the provided user id
export const getConversation = async (req, res) => {
  try {
    const myId = req.user._id;
    const otherPersonId = req.params.id;
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: otherPersonId },
        { senderId: otherPersonId, receiverId: myId },
      ],
    });
    res.status(200).json({ messages: messages });
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
    console.log(`Error in getConversation controller: ${error}`);
  }
};

// send message to the provided user id
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const myId = req.user._id;
    const otherPersonId = req.params.id;

    let imageURL;
    if (image) {
      const cloudinaryResponse = await cloudinary.uploader.upload(image);
      imageURL = cloudinaryResponse.secure_url;
    }

    const newMessage = new Message({
      senderId: myId,
      receiverId: otherPersonId,
      text: text,
      image: imageURL,
    });
    await newMessage.save();

    const recieverSocketId = getSocketIdFromUserId(newMessage.receiverId);
    // send to reciever socket only if online (if not in onlineUsers, recieverSocketId = undefined)
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: newMessage });
  } catch (error) {
    res.status(500).json({ message: `Internal server error ${error}` });
    console.log(`Error in sendMessage controller: ${error}`);
  }
};
