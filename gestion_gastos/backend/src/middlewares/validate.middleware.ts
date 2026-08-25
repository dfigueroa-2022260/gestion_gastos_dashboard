import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

export const validate = (schema: ZodSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const mensaje = result.error.errors
        .map((e) => e.message)
        .join(", ");
      throw new AppError(mensaje, 422);
    }

    req.body = result.data;
    next();
  };
};
