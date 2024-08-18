"use server";

import { db } from "@/lib/db";

export async function getEntrenadoresRegistrados() {
  try {
    const fetch = await db.usuario.findMany({
      where: {
        rol: "entrenador"
      },
      include: {
        _count: {
          select: {
            compite: true
          }
        }
      }
    });

    const data = fetch.map(entrenador => ({
      id: entrenador.id,
      Nombre: entrenador.nombre,
      "Fecha de nacimiento": entrenador.nacimiento.toLocaleDateString(),
      Participaciones: entrenador._count.compite
    }))

    const columns = ["Nombre", "Fecha de nacimiento", "Participaciones"].map((field) => {
      return {
        field: field,
        flex: 1,
        headerAlign: 'center',
        align: 'center'
      }
    })

    return { columns: columns, data: data }
  } catch (error) {
    return null
  }
}