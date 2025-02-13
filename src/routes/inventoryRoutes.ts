import express from "express";
import {
  createInventoryItem,
  getAllInventoryItems,
  getInventoryItemById,
  updateInventoryItem,
  deleteInventoryItem
} from "../controllers/inventoryController";
import {
  authMiddleware,
  adminOnlyMiddleware
} from "../middlewares/authMiddleware";
import { validateInputs } from "../middlewares/validationInputs";
import { inventoryItemSchema } from "../utils/validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(inventoryItemSchema),
  createInventoryItem
);
router.get("/", authMiddleware, getAllInventoryItems);
router.get("/:id", authMiddleware, getInventoryItemById);
router.patch(
  "/:id",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(inventoryItemSchema),
  updateInventoryItem
);
router.delete("/:id", authMiddleware, adminOnlyMiddleware, deleteInventoryItem);

export default router;
