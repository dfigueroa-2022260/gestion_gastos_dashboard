import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
  listarCategorias,
} from "./categoria.service";

export const listar = asyncHandler(async (req: Request, res: Response) => {
  const categorias = await listarCategorias(req.usuarioId as string);
  res.status(200).json(categorias);
});

export const crear = asyncHandler(async (req: Request, res: Response) => {
  const categoria = await crearCategoria(req.usuarioId as string, req.body);
  res.status(201).json(categoria);
});

export const actualizar = asyncHandler(async (req: Request, res: Response) => {
  const categoria = await actualizarCategoria(
    req.usuarioId as string,
    req.params.id,
    req.body
  );
  res.status(200).json(categoria);
});

export const eliminar = asyncHandler(async (req: Request, res: Response) => {
  await eliminarCategoria(req.usuarioId as string, req.params.id);
  res.status(204).send();
});
