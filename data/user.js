import { db } from "@/lib/db"

export async function getUser(nombre) {
  try {
    const user = await db.usuario.findUnique({where:{nombre}})
    return user
  } catch {
    return null
  }
}