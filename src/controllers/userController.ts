import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { generateToken } from "../utils/auth";
import { sendResponse } from "../utils/sendResponse";
import User from "../models/User.models";

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
    if (!req.user) {
      // Use sendResponse and return to stop execution
      return sendResponse(
        res,
        404,
        "You are not authorized to do that, Please log in first",
        null,
        ["You are not authorized to do that, Please Login first"]
      );
    }
    const user = await User.findByPk(req.user?.userId);
    sendResponse(res, 200, "Person updated successfully", user);

    res.status(200).json(user);
  } catch (error) {
    // Use sendResponse without returning
    sendResponse(res, 500, "Error fetching profile", null, [
      "Internal server error"
    ]);
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  if (!req.user) {
    // Use sendResponse and return to stop execution
    return sendResponse(res, 401, "UnAuthorized request", null, [
      "UnAuthorized request"
    ]);
  }
  try {
    const updatedUser = await User.findByPk(req.user.userId);
    res.status(200).json(updatedUser);
    sendResponse(res, 200, "User updated successfully", updatedUser);
  } catch (error) {
    // Use sendResponse without returning
    sendResponse(res, 500, "Error updating profile", null, [
      "Internal server error"
    ]);
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
