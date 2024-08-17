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

    const data = fetch.length > 0 ?
      fetch.map(evento => ({
        id: evento.id,
        Fecha: evento.fecha.toLocaleDateString(),
        Evento: evento.nombre,
        Lugar: evento.lugar.nombre,
      })) :
      [{ id: 0, Fecha: "", Evento: "", Lugar: "" }]

    const columns = Object.keys(data[0] || {}).slice(1).map((field) => { return { field: field, flex: 1, headerAlign: 'center', align: 'center' } })

    return { columns: columns, data: data }
  } catch (error) {
    return null
  }
}