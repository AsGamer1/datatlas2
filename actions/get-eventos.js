"use server";

import { db } from "@/lib/db";

export async function getFuturosEventos() {
  try {
    const resultados = await db.evento.findMany({
      include: {
        lugar: true
      },
      where: {
        fecha: {
          gte: new Date()
        }
      }
    });

    if (resultados.length > 0) {
      return resultados.map(evento => ({
        id: evento.id,
        Fecha: evento.fecha.toLocaleDateString(),
        Evento: evento.nombre,
        Lugar: evento.lugar.nombre,
      }));
    } else {
      return [{ id: 0, Fecha: "", Evento: "", Lugar: "" }]
    }
  } catch (error) {
    return null
  }
}