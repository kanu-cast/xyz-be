import jwt from "jsonwebtoken";
import User from "../models/User.models";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export const generateToken = (user: User) => {
  return jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, {
    expiresIn: "1h"
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string; role: string };
};
