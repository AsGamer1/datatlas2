"use server";

import { RegisterUserSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";

export async function register(values) {
  const validatedFields = RegisterUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni, nombre, nacimiento } = validatedFields.data
  const properNombre = nombre.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ')
  const capitalDNI = dni.toUpperCase()
  const existingUser = await getUser(dni)

  if (existingUser) return { error: "Ya existe este usuario" }

  await db.usuario.create({ data: { nombre: properNombre, dni: capitalDNI, nacimiento } })

  return { success: "Usuario creado" }
}