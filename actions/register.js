"use server";

/*
  Acción de servidor para registrar atletas
  Se restringe el uso de esta acción a usuarios con sesión iniciada que tengan el rol de entrenadores
*/

import { RegisterUserSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { auth } from "@/auth";

dayjs.extend(utc);

export async function registerUser(values) {
  // Comprueba la sesión actual, si el usuario no es entrenador, no se le permite continuar con la ejecución de esta acción
  const session = await auth();
  if (session?.user?.image !== "entrenador") return { error: "Permiso denegado" }

  const validatedFields = RegisterUserSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { dni, nombre, nacimiento } = validatedFields.data

  const existingUser = await getUser(dni)
  if (existingUser) return { error: "Ya existe este usuario" }

  const properNombre = nombre.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ')
  const capitalDNI = dni.toUpperCase()
  const utcNacimiento = dayjs(nacimiento).utc(true).toDate()

  await db.usuario.create({ data: { nombre: properNombre, dni: capitalDNI, nacimiento: utcNacimiento } })

  return { success: "Usuario creado" }
}