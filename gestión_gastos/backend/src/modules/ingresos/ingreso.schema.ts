import { z } from "zod";

export const ingresoSchema = z.object({
  monto: z.number().positive("El monto debe ser mayor a 0"),
  descripcion: z.string().optional(),
  fecha: z.coerce.date().optional(),
  categoriaId: z.string().uuid("Categoria invalida"),
});

export type IngresoInput = z.infer<typeof ingresoSchema>;
