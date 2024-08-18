"use server";

import { db } from "@/lib/db";

export async function getAtletasRegistrados() {
  try {
    const fetch = await db.usuario.findMany({
      where: {
        rol: "atleta"
      },
      include: {
        _count: {
          select: {
            compite: true
          }
        }
      }
    });

    const data = fetch.map(atleta => ({
      id: atleta.id,
      Nombre: atleta.nombre,
      "Fecha de nacimiento": atleta.nacimiento.toLocaleDateString(),
      Participaciones: atleta._count.compite
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