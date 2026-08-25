import crypto from "crypto";
import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { generarToken } from "../../utils/jwt.util";
import { comparePassword, hashPassword } from "../../utils/password.util";
import {
  LoginInput,
  OlvidePasswordInput,
  RegistroInput,
  ResetPasswordInput,
} from "./auth.schema";

const RESET_TOKEN_VIGENCIA_MS = 60 * 60 * 1000; // 1 hora

export const registrarUsuario = async (data: RegistroInput) => {
  const existente = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (existente) {
    throw new AppError("Ya existe una cuenta con ese correo", 409);
  }

  const passwordHash = await hashPassword(data.password);

  const usuario = await prisma.usuario.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password: passwordHash,
      // El registro publico siempre crea usuarios con rol USUARIO.
      // Un admin se crea via seed o promoviendo a un usuario existente (ver README).
      rol: "USUARIO",
    },
  });

  const token = generarToken({ usuarioId: usuario.id, rol: usuario.rol });

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  };
};

export const solicitarResetPassword = async (data: OlvidePasswordInput) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  // Por seguridad, siempre respondemos igual exista o no el correo,
  // para no revelar que correos estan registrados.
  if (!usuario) {
    return;
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenExp = new Date(Date.now() + RESET_TOKEN_VIGENCIA_MS);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: { resetToken, resetTokenExp },
  });

  // TODO: integrar un proveedor de correo (ej. nodemailer) para enviar este link.
  // Mientras tanto, queda impreso en consola para poder probar el flujo en desarrollo.
  const resetUrl = `http://localhost:4200/reset-password?token=${resetToken}`;
  console.log(`[Cash Track] Link de recuperacion para ${usuario.email}: ${resetUrl}`);
};

export const resetearPassword = async (data: ResetPasswordInput) => {
  const usuario = await prisma.usuario.findFirst({
    where: {
      resetToken: data.token,
      resetTokenExp: { gt: new Date() },
    },
  });

  if (!usuario) {
    throw new AppError("El enlace es invalido o ya expiro", 400);
  }

  const passwordHash = await hashPassword(data.password);

  await prisma.usuario.update({
    where: { id: usuario.id },
    data: {
      password: passwordHash,
      resetToken: null,
      resetTokenExp: null,
    },
  });
};

export const iniciarSesion = async (data: LoginInput) => {
  const usuario = await prisma.usuario.findUnique({
    where: { email: data.email },
  });

  if (!usuario) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const passwordValida = await comparePassword(data.password, usuario.password);

  if (!passwordValida) {
    throw new AppError("Credenciales invalidas", 401);
  }

  const token = generarToken({ usuarioId: usuario.id, rol: usuario.rol });

  return {
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
    },
  };
};
