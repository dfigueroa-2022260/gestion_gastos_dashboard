import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { CategoriaInput } from "./categoria.schema";

export const listarCategorias = (usuarioId: string) => {
  return prisma.categoria.findMany({
    where: { usuarioId },
    orderBy: { nombre: "asc" },
  });
};

export const crearCategoria = async (
  usuarioId: string,
  data: CategoriaInput
) => {
  const existente = await prisma.categoria.findFirst({
    where: { usuarioId, nombre: data.nombre },
  });

  if (existente) {
    throw new AppError("Ya tienes una categoria con ese nombre", 409);
  }

  return prisma.categoria.create({
    data: { ...data, usuarioId },
  });
};

export const actualizarCategoria = async (
  usuarioId: string,
  id: string,
  data: CategoriaInput
) => {
  const categoria = await prisma.categoria.findFirst({
    where: { id, usuarioId },
  });

  if (!categoria) {
    throw new AppError("Categoria no encontrada", 404);
  }

  return prisma.categoria.update({ where: { id }, data });
};

export const eliminarCategoria = async (usuarioId: string, id: string) => {
  const categoria = await prisma.categoria.findFirst({
    where: { id, usuarioId },
  });

  if (!categoria) {
    throw new AppError("Categoria no encontrada", 404);
  }

  await prisma.categoria.delete({ where: { id } });
};
