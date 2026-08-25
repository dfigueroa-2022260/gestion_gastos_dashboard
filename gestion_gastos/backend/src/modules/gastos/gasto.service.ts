import { prisma } from "../../config/prisma";
import { AppError } from "../../utils/AppError";
import { GastoInput } from "./gasto.schema";

export const listarGastos = (usuarioId: string) => {
  return prisma.gasto.findMany({
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

export const crearGasto = async (usuarioId: string, data: GastoInput) => {
  await validarCategoria(usuarioId, data.categoriaId);

  return prisma.gasto.create({
    data: { ...data, usuarioId },
    include: { categoria: true },
  });
};

export const actualizarGasto = async (
  usuarioId: string,
  id: string,
  data: GastoInput
) => {
  const gasto = await prisma.gasto.findFirst({ where: { id, usuarioId } });

  if (!gasto) {
    throw new AppError("Gasto no encontrado", 404);
  }

  await validarCategoria(usuarioId, data.categoriaId);

  return prisma.gasto.update({
    where: { id },
    data,
    include: { categoria: true },
  });
};

export const eliminarGasto = async (usuarioId: string, id: string) => {
  const gasto = await prisma.gasto.findFirst({ where: { id, usuarioId } });

  if (!gasto) {
    throw new AppError("Gasto no encontrado", 404);
  }

  await prisma.gasto.delete({ where: { id } });
};

export const resumenPorCategoria = async (usuarioId: string) => {
  const resultado = await prisma.gasto.groupBy({
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
