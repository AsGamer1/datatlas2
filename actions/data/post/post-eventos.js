"use server";

/*
  Acción de servidor para agregar eventos
  Se restringe el uso de esta acción a usuarios con sesión iniciada que tengan el rol de entrenadores
*/

import { AddEventoSchema } from "@/schemas";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { auth } from "@/auth";

dayjs.extend(utc);

export async function addEvento(values) {
  // Comprueba la sesión actual, si el usuario no es entrenador, no se le permite continuar con la ejecución de esta acción
  const session = await auth();
  if (session?.user?.image !== "entrenador" && session?.user?.image !== "admin") return { error: "Permiso denegado" }

  const validatedFields = AddEventoSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { nombre, fecha, lugar } = validatedFields.data

  const utcFecha = dayjs(fecha).utc(true).toDate()

  await db.evento.create({ data: { nombre: nombre, fecha: utcFecha, id_lugar: lugar } })

  return { success: "Evento creado" }
}