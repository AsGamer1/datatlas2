"use server";

import { AddLugarSchema } from "@/schemas";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { getLugarById } from "@/data/lugar";

export async function postLugares(lugaresData, lugares) {
  // Comprueba la sesión actual, si el usuario no es entrenador, no se le permite continuar con la ejecución de esta acción
  const session = await auth()
  if (session?.user?.image !== "entrenador" && session?.user?.image !== "admin") return { error: "Permiso denegado" }

  try {
    let res = {}

    for (const lugar of lugares) {
      if (lugaresData.some((lugarData) => lugarData === lugar.Nombre)) {
        const validatedFields = AddLugarSchema.safeParse(lugar)
        if (!validatedFields.success) return { error: "Campos inválidos" }
        const { id, Nombre, Descripcion, Latitud, Longitud } = validatedFields.data
        if (!await getLugarById(id)) {
          await db.lugar.create({
            data: {
              id: id,
              nombre: Nombre,
              descripcion: Descripcion,
              latitud: Latitud,
              longitud: Longitud
            }
          })
        }
        res[Nombre] = id
      }
    }

    return { success: "Cambios guardados con éxito", res }
  } catch (error) {
    console.log(error)
    return { error: "Ocurrió un error al procesar los lugares" }
  }
}