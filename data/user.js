import { db } from "@/lib/db"

export async function getUser(nombre, nacimiento) {
  try {
    const user = await db.usuario.findUnique({ where: { usuario: { nombre, nacimiento } } })
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