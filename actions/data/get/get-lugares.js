"use server";

import { db } from "@/lib/db";

export async function getLugares() {
  try {
    const fetch = await db.lugar.findMany();

    const data = fetch.map(lugar => ({
      label: lugar.nombre
    }))

    return data
  } catch (error) {
    return null
  }
}