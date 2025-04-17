import User from "../models/user.model.js";
import {
  hashPassword,
  createAccessToken,
  compareHashedPassword,
} from "../utils/auth.utils.js";
import cloudinary from "../configs/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be greater than 6 characters" });
    }

    // check if user exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User with given email already exists" });
    }

    // hash password and create user
    const hashedPassword = await hashPassword(password);
    const newUser = new User({ email, name, password: hashedPassword });
    await newUser.save();

    // create jwt access token and send in cookie
    createAccessToken({ id: newUser._id }, res);

    res.status(201).json({
      user: { _id: user._id, name: user.name, email, profilePicture: user.profilePicture, createdAt: user.createdAt },
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: `Error occured: ${error}` });
    console.log(`Error in signup controller: ${error}`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (!(await compareHashedPassword(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    createAccessToken({ id: user._id }, res);

    res.status(200).json({
      user: { _id: user._id, name: user.name, email, profilePicture: user.profilePicture, createdAt: user.createdAt },
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ message: `Error occured: ${error}` });
    console.log(`Error in login controller: ${error}`);
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("accessToken"); // clear access token from cookie
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: `Error occured: ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const profilePicture = req.body.profilePicture;

    if (!profilePicture)
      return res.status(401).json({ message: "Profile picture not provided" });

    const cloudinaryResponse = await cloudinary.uploader.upload(profilePicture);
    user.profilePicture = cloudinaryResponse.secure_url;
    await user.save();

    res.status(201).json({user, message: "Profile picture updated" });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
    console.log(`Error in updateProfile controller: ${error}`);
  }
};

// for checking if user is logged in - takes in user from protectRoute middleware
export const checkAuth = (req, res) => {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
    console.log(`Error in checkAuth controller: ${error}`);
  }
};
