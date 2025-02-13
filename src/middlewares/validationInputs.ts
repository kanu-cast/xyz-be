import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

export const validateInputs = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error) {
      res.status(400).json({ errors: error.errors });
    }
  };
};
