import User from "../models/user.model.js";
import { verifyAccessToken } from "../utils/auth.utils.js";

// only allows logged in users (users with access token) to access content
export const protectRoute = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) {
      return res.status(401).json({ message: "Access token missing" });
    }
    const decodedToken = verifyAccessToken(accessToken);
    // no need to check this as it will never run if validation fails anyways
    // if (!decodedToken){
    //   return res.status(400).json({message: "Invalid credentials"})
    // }
    const userId = decodedToken.id;

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: `Internal server error: ${error}` });
    console.log(`Error in protectRoute middleware: ${error}`);
  }
};
