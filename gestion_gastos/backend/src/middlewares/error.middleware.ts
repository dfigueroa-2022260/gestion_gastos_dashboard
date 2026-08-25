import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  console.error(err);
  return res.status(500).json({ error: "Error interno del servidor" });
};

export const notFoundMiddleware = (_req: Request, res: Response) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};
