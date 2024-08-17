"use server";

import { db } from "@/lib/db";

export async function getMarcasRegistradas() {
  try {
    const resultados = await db.compite.findMany({
      include: {
        usuario: true,
        participacion: {
          include: {
            competicion: {
              include: {
                prueba: true
              }
            }
          }
        }
      }
    })

    if (resultados.length > 0) {
      return resultados.map(compite => ({
        id: compite.id_participacion & compite.id_usuario,
        Nombre: compite.usuario.nombre,
        Prueba: compite.participacion.competicion.prueba.nombre,
        Marca: compite.participacion.marca,
      }));
    } else {
      return [{ id: 0, Nombre: "", Prueba: "", Marca: "" }]
    }
  } catch (error) {
    return null
  }
}