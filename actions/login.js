"use server";

// Schemas
import { LoginSchema } from "@/schemas";

export async function login(values) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  return { success: "Iniciando sesión..." }
}