import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

export const validateInputs = (schema: AnySchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next(); // Pass control to the next middleware
    } catch (error) {
      // Narrow down the type of `error`
      if (error instanceof Error && "errors" in error) {
        res
          .status(400)
          .json({ errors: (error as { errors: string[] }).errors });
      } else {
        res.status(400).json({ errors: ["Validation failed"] });
      }
    }
  };
};
