import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { generateToken } from "../utils/auth";

const userService = new UserService();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const newUser = await userService.createUser(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    const token = generateToken(user);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.user.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUser(req.user.userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    // Invalidate token (optional, depends on your auth strategy)
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};
