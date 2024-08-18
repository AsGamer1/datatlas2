"use server";

import { db } from "@/lib/db";

export async function getFuturosEventos() {
  try {
    const fetch = await db.evento.findMany({
      include: {
        lugar: true
      },
      where: {
        fecha: {
          gte: new Date()
        }
      }
    });

    const data = fetch.map(evento => ({
      id: evento.id,
      Fecha: evento.fecha.toLocaleDateString(),
      Evento: evento.nombre,
      Lugar: evento.lugar.nombre,
    }))

    const columns = ["Fecha", "Evento", "Lugar"].map((field) => {
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