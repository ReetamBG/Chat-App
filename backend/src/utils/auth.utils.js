import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const compareHashedPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export const createAccessToken = (payload, res) => {
  try {
    const token = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    res.cookie("accessToken", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      httpOnly: true,
      sameSite: "Strict",
    });
  } catch (error) {
    throw error;
  }
};

export const verifyAccessToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    return decodedToken;
  } catch (error) {
    throw error;
  }
};
