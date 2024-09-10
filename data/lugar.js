/* 
  Funciones reutilizadas a lo largo del programa para obtener el objeto lugar a partir de campos únicos
*/
import { db } from "@/lib/db"

export async function getLugar(nombre) {
  try {
    const lugar = await db.lugar.findUnique({ where: { nombre } })
    return lugar
  } catch {
    return null
  }
}

export async function getLugarById(id) {
  try {
    const lugar = await db.lugar.findUnique({ where: { id } })
    return lugar
  } catch {
    return null
  }
}