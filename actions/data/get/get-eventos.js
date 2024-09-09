"use server";

import { db } from "@/lib/db";
import dayjs from "dayjs";

export async function getEditableEventos() {
  try {
    const fetch = await db.evento.findMany({
      include: {
        lugar: true
      },
      orderBy: {
        fecha: "desc"
      }
    })

    const data = fetch.map(evento => ({
      id: evento.id,
      Fecha: evento.fecha,
      Evento: evento.nombre,
      Lugar: evento.lugar.nombre,
    }))

    const columns = [
      { field: "Fecha", flex: 1, headerAlign: "center", align: "center", editable: true },
      { field: "Evento", flex: 1, headerAlign: "center", align: "center", editable: true },
      { field: "Lugar", flex: 1, headerAlign: "center", align: "center", editable: true }
    ]

    return { columns: columns, data: data }
  } catch (error) {
    return null
  }
}

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
    })

    const data = fetch.map(evento => ({
      id: evento.id,
      Fecha: dayjs(evento.fecha).format("DD/MM/YYYY"),
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