import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

/**
 * Restringe una ruta a uno o mas roles. Debe usarse siempre DESPUES de
 * authMiddleware, ya que depende de req.usuarioRol.
 *
 * Ejemplo: router.get("/", authMiddleware, requireRole("ADMIN"), listar);
 */
export const requireRole = (...rolesPermitidos: Array<"ADMIN" | "USUARIO">) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.usuarioRol || !rolesPermitidos.includes(req.usuarioRol)) {
      throw new AppError("No tienes permisos para esta accion", 403);
    }
    next();
  };
};
