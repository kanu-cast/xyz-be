import express from "express";
import {
  createDamageReport,
  getAllDamageReports,
  getDamageReportById,
  updateDamageReport
} from "../controllers/damgeReportsController";
import {
  authMiddleware,
  adminOnlyMiddleware
} from "../middlewares/authMiddleware";
import { validateInputs } from "../middlewares/validationInputs";
import { damageReportSchema } from "../utils/validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(damageReportSchema),
  createDamageReport
);
router.get("/", authMiddleware, getAllDamageReports);
router.get("/:id", authMiddleware, getDamageReportById);
router.patch(
  "/:id",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(damageReportSchema),
  updateDamageReport
);

export default router;
