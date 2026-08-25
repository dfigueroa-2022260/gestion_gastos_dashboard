import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  actualizarGasto,
  crearGasto,
  eliminarGasto,
  listarGastos,
  resumenPorCategoria,
} from "./gasto.service";

export const listar = asyncHandler(async (req: Request, res: Response) => {
  const gastos = await listarGastos(req.usuarioId as string);
  res.status(200).json(gastos);
});

export const crear = asyncHandler(async (req: Request, res: Response) => {
  const gasto = await crearGasto(req.usuarioId as string, req.body);
  res.status(201).json(gasto);
});

export const actualizar = asyncHandler(async (req: Request, res: Response) => {
  const gasto = await actualizarGasto(
    req.usuarioId as string,
    req.params.id,
    req.body
  );
  res.status(200).json(gasto);
});

export const eliminar = asyncHandler(async (req: Request, res: Response) => {
  await eliminarGasto(req.usuarioId as string, req.params.id);
  res.status(204).send();
});

export const resumen = asyncHandler(async (req: Request, res: Response) => {
  const data = await resumenPorCategoria(req.usuarioId as string);
  res.status(200).json(data);
});
