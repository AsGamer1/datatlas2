"use server";

import { db } from "@/lib/db";

export async function getLugares() {
  try {
    const fetch = await db.lugar.findMany();

    const data = fetch.map((lugar) => ({
      main: lugar.nombre,
      secondary: lugar.descripcion
    }))
    
    return data
  } catch (error) {
    return null
  }
}