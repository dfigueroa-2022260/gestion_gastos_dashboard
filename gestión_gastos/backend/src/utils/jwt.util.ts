import jwt from "jsonwebtoken";
import { env } from "../config/env";

export type RolUsuario = "ADMIN" | "USUARIO";

export interface JwtPayload {
  usuarioId: string;
  rol: RolUsuario;
}

export const generarToken = (payload: JwtPayload): string => {
  const opciones: jwt.SignOptions = {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  };
  return jwt.sign(payload, env.jwtSecret, opciones);
};

export const verificarToken = (token: string): JwtPayload => {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
};
