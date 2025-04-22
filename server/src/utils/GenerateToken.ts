import jwt from "jsonwebtoken";
import { Response } from "express";
import { UserDocs } from "../types/UserTypes";
export const GenerateToken = async (res: Response | null, user: UserDocs) => {
  try {
    const token = await jwt.sign({ userid: user._id }, process.env.JWT_TOKEN!, {
      expiresIn: "1d",
    });
    
    if (res) {
      // Set cookie with appropriate settings for cross-origin
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // true in production
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      
      // Also return token in response for client storage
      return { token };
    }
    return token;
  } catch (error: any) {
    if (res) {
      return res.status(500).json({ message: error.message });
    }
  }
};
