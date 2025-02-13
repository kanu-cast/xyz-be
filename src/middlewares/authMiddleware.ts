import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};
