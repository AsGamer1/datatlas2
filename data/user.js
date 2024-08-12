/* 
  Funciones reutilizadas a lo largo del programa para obtener el objeto usuario a partir de campos únicos
*/
import { db } from "@/lib/db"

export async function getUser(dni) {
  try {
    const user = await db.usuario.findUnique({ where: { dni } })
    return user
  } catch {
    return null
  }
}

export async function getUserById(id) {
  try {
    const user = await db.usuario.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}