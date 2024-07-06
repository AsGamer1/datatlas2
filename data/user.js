import { db } from "@/lib/db"

export async function getUser(dni) {
  try {
    const test = await db.$queryRaw`SELECT ${dni} FROM usuario`

    const user = await db.usuario.findFirst({ where: { dni } })
    console.log(user)
    return null
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