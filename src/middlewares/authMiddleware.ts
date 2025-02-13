import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return; // Stop execution here
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user info to the request
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};
export const adminOnlyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Access denied. Admin only." });
    return; // Stop execution here
  }
  next(); // Pass control to the next middleware
};
