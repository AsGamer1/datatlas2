"use server";

import { db } from "@/lib/db";

export async function getLugares() {
  try {
    const fetch = await db.lugar.findMany();

    const data = fetch.map((lugar) => ({
      main: lugar.nombre,
      secondary: lugar.descripcion,
      place_id: lugar.id,
      lat: lugar.latitud,
      lng: lugar.longitud
    }))

    return data
  } catch (error) {
    return null
  }
}