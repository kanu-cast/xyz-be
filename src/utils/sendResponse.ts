import { Response } from "express";

type ResponsePayload = {
  success: boolean;
  message: string;
  data?: any;
  errors?: string[];
};

/**
 * Sends a standardized response for all API endpoints.
 * @param res - The Express response object.
 * @param statusCode - The HTTP status code.
 * @param message - A human-readable message describing the result.
 * @param data - The payload to return (optional).
 * @param errors - An array of error messages (optional).
 */
export const sendResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
  errors?: string[]
) => {
  const payload: ResponsePayload = {
    success: statusCode >= 200 && statusCode < 300,
    message,
    data,
    errors: errors || []
  };

  res.status(statusCode).json(payload);
};
