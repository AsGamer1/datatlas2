"use server";

import { RegisterAdminSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";
import bcrypt from "bcryptjs"

export async function register(values) {
  const validatedFields = RegisterAdminSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni, nombre, nacimiento, password } = validatedFields.data
  const existingUser = await getUser(dni)
  const properNombre = nombre.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ')
  const capitalDNI = dni.toUpperCase()
  const hashedPassword = await bcrypt.hash(password, 10)

  if (existingUser) return { error: "Ya existe este usuario" }

  await db.usuario.create({ data: { nombre: properNombre, dni: capitalDNI, nacimiento, password: hashedPassword, rol: "entrenador" } })

  return { success: "Usuario creado" }
}