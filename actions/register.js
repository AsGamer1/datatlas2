"use server";

import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";

export async function register(values) {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { nombre, fecha, password } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)
  const formatedFecha = (new Date(fecha)).toISOString()
  const existingUser = await getUser(nombre, formatedFecha)

  if (existingUser) return { error: "Ya existe este usuario" }

  await db.usuario.create({ data: { nombre, nacimiento: formatedFecha, password: hashedPassword } })

  return { success: "Usuario creado" }
}