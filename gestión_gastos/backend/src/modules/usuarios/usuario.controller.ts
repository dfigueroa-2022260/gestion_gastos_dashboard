import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { listarUsuarios, obtenerPerfil } from "./usuario.service";

export const perfil = asyncHandler(async (req: Request, res: Response) => {
  const usuario = await obtenerPerfil(req.usuarioId as string);
  res.status(200).json(usuario);
});

export const listar = asyncHandler(async (_req: Request, res: Response) => {
  const usuarios = await listarUsuarios();
  res.status(200).json(usuarios);
});
