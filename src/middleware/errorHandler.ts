import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }
  if (err.name === "ZodError") {
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors: JSON.parse(err.message),
    });
    return;
  }
  console.error("Unexpected error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};
