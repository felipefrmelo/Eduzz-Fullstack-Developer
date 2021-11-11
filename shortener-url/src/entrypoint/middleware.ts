import { NextFunction, Request, Response } from "express";
import { CustomError } from "../domain/erros";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).render("index", {
      error: err.message,
    });
  }

  return res.status(500).render("error", {
    error: err.message,
  });
}
