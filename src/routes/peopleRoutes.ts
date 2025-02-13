import express from "express";
import {
  createPerson,
  getAllPeople,
  getPersonById,
  updatePerson
} from "../controllers/peopleController";
import {
  authMiddleware,
  adminOnlyMiddleware
} from "../middlewares/authMiddleware";
import { validateInputs } from "../middlewares/validationInputs";
import { personSchema } from "../utils/validation";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(personSchema),
  createPerson
);
router.get("/", authMiddleware, getAllPeople);
router.get("/:id", authMiddleware, getPersonById);
router.patch(
  "/:id",
  authMiddleware,
  adminOnlyMiddleware,
  validateInputs(personSchema),
  updatePerson
);

export default router;
