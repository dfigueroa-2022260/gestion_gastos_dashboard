import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";

export const obtenerPerfil = async (usuarioId: string) => {
  const usuario = await prisma.usuario.findUnique({
    where: { id: usuarioId },
    select: { id: true, nombre: true, email: true, rol: true, createdAt: true },
  });

  if (!usuario) {
    throw new AppError("Usuario no encontrado", 404);
  }

  return usuario;
};

export const listarUsuarios = () => {
  return prisma.usuario.findMany({
    select: { id: true, nombre: true, email: true, rol: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
};
