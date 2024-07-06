"use server";

import { RegisterUserSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";

export async function register(values) {
  const validatedFields = RegisterUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni, nombre } = validatedFields.data
  const existingUser = await getUser(dni)

  if (existingUser) return { error: "Ya existe este usuario" }

  await db.usuario.create({ data: { nombre, dni } })

  return { success: "Usuario creado" }
}