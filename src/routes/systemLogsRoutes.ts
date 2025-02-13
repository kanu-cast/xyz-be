import express from "express";
import {
  getAllSystemLogs,
  getSystemLogById
} from "../controllers/systemLogsController";
import {
  authMiddleware,
  adminOnlyMiddleware
} from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, adminOnlyMiddleware, getAllSystemLogs);
router.get("/:id", authMiddleware, adminOnlyMiddleware, getSystemLogById);

export default router;
