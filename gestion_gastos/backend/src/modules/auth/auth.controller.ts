import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import {
  iniciarSesion,
  registrarUsuario,
  resetearPassword,
  solicitarResetPassword,
} from "./auth.service";

export const registro = asyncHandler(async (req: Request, res: Response) => {
  const resultado = await registrarUsuario(req.body);
  res.status(201).json(resultado);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const resultado = await iniciarSesion(req.body);
  res.status(200).json(resultado);
});

export const olvidePassword = asyncHandler(async (req: Request, res: Response) => {
  await solicitarResetPassword(req.body);
  res.status(200).json({
    mensaje: "Si el correo existe, te enviamos instrucciones para recuperar tu contraseña.",
  });
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  await resetearPassword(req.body);
  res.status(200).json({ mensaje: "Contraseña actualizada correctamente." });
});
