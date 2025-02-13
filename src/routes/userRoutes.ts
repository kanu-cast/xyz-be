import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  logoutUser
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateInputs } from "../middlewares/validationInputs";
import { registerUserSchema, loginUserSchema } from "../utils/validation";

const router = express.Router();

router.post("/register", validateInputs(registerUserSchema), registerUser);
router.post("/login", validateInputs(loginUserSchema), loginUser);
router.get("/profile", authMiddleware, getProfile);
router.patch("/profile", authMiddleware, updateProfile);
router.post("/logout", authMiddleware, logoutUser);

export default router;
