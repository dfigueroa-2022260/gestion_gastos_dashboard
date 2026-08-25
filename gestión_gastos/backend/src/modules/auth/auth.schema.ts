import { z } from "zod";

export const registroSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Correo invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const loginSchema = z.object({
  email: z.string().email("Correo invalido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const olvidePasswordSchema = z.object({
  email: z.string().email("Correo invalido"),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token invalido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type RegistroInput = z.infer<typeof registroSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type OlvidePasswordInput = z.infer<typeof olvidePasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
