"use server";

/*
  Acción de servidor para agregar eventos
  Se restringe el uso de esta acción a usuarios con sesión iniciada que tengan el rol de entrenador o admin
*/

import { AddEventoSchema } from "@/schemas";
import { db } from "@/lib/db";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { auth } from "@/auth";
import { postLugares } from "./post-lugares";
dayjs.extend(utc);

export async function postEventos({ unsavedRows, newRows, lugares }) {
  // Comprueba la sesión actual, si el usuario no es entrenador, no se le permite continuar con la ejecución de esta acción
  const session = await auth()
  if (session?.user?.image !== "entrenador" && session?.user?.image !== "admin") return { error: "Permiso denegado" }

  try {
    const rows = { ...unsavedRows, ...newRows }
    const lugaresData = Object.values(rows).map(row => row.Lugar)
    const lugaresCreated = await postLugares(lugaresData, lugares)

    if (lugaresCreated.error) {
      console.log(lugaresCreated.error)
      return { error: "Ha habido un problema al procesar los lugares" }
    }
    if (unsavedRows) {
      for (const row of Object.values(unsavedRows)) {
        const validatedFields = AddEventoSchema.safeParse(row)

        if (row._action === "delete") {
          await db.evento.delete({ where: { id: validatedFields.data.id } })
        } else {
          if (!validatedFields.success) return { error: "Campos inválidos" }

          const { Evento, Fecha, Lugar, id } = validatedFields.data

          const utcFecha = dayjs(Fecha).utc(true).toDate()

          const id_lugar = (await db.lugar.findUnique({ where: { nombre: Lugar } }))?.id || lugaresCreated.res[Lugar]

          await db.evento.update({
            where: { id: id },
            data: { nombre: Evento, fecha: utcFecha, id_lugar: id_lugar },
          })
        }
      }
    }

    if (newRows) {
      for (const row of Object.values(newRows)) {
        const validatedFields = AddEventoSchema.safeParse(row)

        if (!validatedFields.success) return { error: "Campos inválidos" }

        const { Evento, Fecha, Lugar } = validatedFields.data

        const utcFecha = dayjs(Fecha).utc(true).toDate()

        const id_lugar = (await db.lugar.findUnique({ where: { nombre: Lugar } }))?.id || lugaresCreated.res[Lugar]

        await db.evento.create({
          data: { nombre: Evento, fecha: utcFecha, id_lugar: id_lugar },
        })
      }
    }

    return { success: "Cambios guardados con éxito" }
  } catch (error) {
    console.log(error)
    return { error: "Ocurrió un error al procesar los eventos" }
  }
}