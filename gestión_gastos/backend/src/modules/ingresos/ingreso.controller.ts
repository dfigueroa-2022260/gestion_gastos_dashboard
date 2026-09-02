import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  actualizarIngreso,
  crearIngreso,
  eliminarIngreso,
  listarIngresos,
  resumenPorCategoria,
} from "./ingreso.service";

export const listar = asyncHandler(async (req: Request, res: Response) => {
  const ingresos = await listarIngresos(req.usuarioId as string);
  res.status(200).json(ingresos);
});

export const crear = asyncHandler(async (req: Request, res: Response) => {
  const ingreso = await crearIngreso(req.usuarioId as string, req.body);
  res.status(201).json(ingreso);
});

export const actualizar = asyncHandler(async (req: Request, res: Response) => {
  const ingreso = await actualizarIngreso(
    req.usuarioId as string,
    req.params.id,
    req.body
  );
  res.status(200).json(ingreso);
});

export const eliminar = asyncHandler(async (req: Request, res: Response) => {
  await eliminarIngreso(req.usuarioId as string, req.params.id);
  res.status(204).send();
});

export const resumen = asyncHandler(async (req: Request, res: Response) => {
  const data = await resumenPorCategoria(req.usuarioId as string);
  res.status(200).json(data);
});
