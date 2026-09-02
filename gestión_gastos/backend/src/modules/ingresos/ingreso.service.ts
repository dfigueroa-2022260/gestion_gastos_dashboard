import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { IngresoInput } from "./ingreso.schema";

export const listarIngresos = (usuarioId: string) => {
  return prisma.ingreso.findMany({
    where: { usuarioId },
    include: { categoria: true },
    orderBy: { fecha: "desc" },
  });
};

const validarCategoria = async (usuarioId: string, categoriaId: string) => {
  const categoria = await prisma.categoria.findFirst({
    where: { id: categoriaId, usuarioId },
  });

  if (!categoria) {
    throw new AppError("Categoria no encontrada", 404);
  }
};

export const crearIngreso = async (usuarioId: string, data: IngresoInput) => {
  await validarCategoria(usuarioId, data.categoriaId);

  return prisma.ingreso.create({
    data: { ...data, usuarioId },
    include: { categoria: true },
  });
};

export const actualizarIngreso = async (
  usuarioId: string,
  id: string,
  data: IngresoInput
) => {
  const ingreso = await prisma.ingreso.findFirst({ where: { id, usuarioId } });

  if (!ingreso) {
    throw new AppError("Ingreso no encontrado", 404);
  }

  await validarCategoria(usuarioId, data.categoriaId);

  return prisma.ingreso.update({
    where: { id },
    data,
    include: { categoria: true },
  });
};

export const eliminarIngreso = async (usuarioId: string, id: string) => {
  const ingreso = await prisma.ingreso.findFirst({ where: { id, usuarioId } });

  if (!ingreso) {
    throw new AppError("Ingreso no encontrado", 404);
  }

  await prisma.ingreso.delete({ where: { id } });
};

export const resumenPorCategoria = async (usuarioId: string) => {
  const resultado = await prisma.ingreso.groupBy({
    by: ["categoriaId"],
    where: { usuarioId },
    _sum: { monto: true },
  });

  const categorias = await prisma.categoria.findMany({
    where: { usuarioId },
  });

  return resultado.map((r) => {
    const categoria = categorias.find((c) => c.id === r.categoriaId);
    return {
      categoriaId: r.categoriaId,
      nombre: categoria?.nombre ?? "Sin categoria",
      color: categoria?.color ?? "#5C6B85",
      total: r._sum.monto ?? 0,
    };
  });
};
