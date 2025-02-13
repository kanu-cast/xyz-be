import express from "express";
import {
  createBorrowing,
  getAllBorrowings,
  getBorrowingById,
  returnBorrowedItem,
  getOverdueBorrowings
} from "../controllers/borrowingController";
import {
  authMiddleware,
  adminOnlyMiddleware
} from "../middlewares/authMiddleware";
import { validateInputs } from "../middlewares/validationInputs";
import { borrowingSchema } from "../utils/validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(borrowingSchema),
  createBorrowing
);
router.get("/", authMiddleware, getAllBorrowings);
router.get("/:id", authMiddleware, getBorrowingById);
router.patch(
  "/:id/return",
  authMiddleware,
  adminOnlyMiddleware,
  returnBorrowedItem
);
router.get(
  "/overdue",
  authMiddleware,
  adminOnlyMiddleware,
  getOverdueBorrowings
);

export default router;
