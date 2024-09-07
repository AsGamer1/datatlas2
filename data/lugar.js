/* 
  Funciones reutilizadas a lo largo del programa para obtener el objeto lugar a partir de campos únicos
*/
import { db } from "@/lib/db"

export async function getLugar(nombre) {
  try {
    const user = await db.lugar.findUnique({ where: { nombre } })
    return user
  } catch {
    return null
  }
}