import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { verificarToken } from "../utils/jwt.util";

declare global {
  namespace Express {
    interface Request {
      usuarioId?: string;
      usuarioRol?: "ADMIN" | "USUARIO";
    }
  }
}

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    throw new AppError("No autorizado", 401);
  }

  const token = header.split(" ")[1];

  try {
    const payload = verificarToken(token);
    req.usuarioId = payload.usuarioId;
    req.usuarioRol = payload.rol;
    next();
  } catch {
    throw new AppError("Token invalido o expirado", 401);
  }
};
