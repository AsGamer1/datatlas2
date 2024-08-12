"use server";

/*
  Acción de servidor para registrar entrenadores
  Se restringe el uso de esta acción a usuarios con sesión iniciada que tengan el rol de entrenadores
*/

import { RegisterAdminSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUser } from "@/data/user";
import bcrypt from "bcryptjs"
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { auth } from "@/auth";

dayjs.extend(utc);

export async function registerAdmin(values) {
  // Comprueba la sesión actual, si el usuario no es entrenador, no se le permite continuar con la ejecución de esta acción
  const session = await auth();
  if (session?.user?.image !== "entrenador") return { error: "Permiso denegado" }

  const validatedFields = RegisterAdminSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { dni, nombre, nacimiento, password } = validatedFields.data

  // Comprueba que el usuario exista, si ya existe se devuelve un error
  const existingUser = await getUser(dni)
  if (existingUser) return { error: "Ya existe este usuario" }

  // Pone en mayúsculas únicamente la primera letra de nombres y apellidos
  const properNombre = nombre.toLowerCase().split(' ').map(function (word) {
    return word.replace(word[0], word[0].toUpperCase());
  }).join(' ')
  // Pone la letra del DNI en mayúsculas
  const capitalDNI = dni.toUpperCase()
  // Fecha de nacimiento formateada para que no se retrase o adelante un día al introducir la fecha
  // Este error ocurre debido a las zonas horarias, ya que la fecha se recoge en la zona local y se entrega en UTC
  const utcNacimiento = dayjs(nacimiento).utc(true).toDate()
  // Se hashea la contraseña antes de entregarla a la base de datos
  const hashedPassword = await bcrypt.hash(password, 10)

  await db.usuario.create({ data: { nombre: properNombre, dni: capitalDNI, nacimiento: utcNacimiento, password: hashedPassword, rol: "entrenador" } })

  return { success: "Usuario creado" }
}