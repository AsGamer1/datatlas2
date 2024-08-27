"use server";

/* 
  Acción de servidor para iniciar sesión como atleta
  Extrae los campos del formulario y busca el usuario a partir del DNI
  Una vez lo encuentra, comprueba su rol. Si es entrenador, devuelve un error con un enlace a la página de inicio de sesión para entrenadores
  En caso de que sea entrenador, trata de iniciar sesión y devuelve el mismo error tanto si no encuentra al usuario como si los datos son incorrectos
*/

import { LoginUserSchema } from "@/schemas";
import { signIn } from "@/auth";
import { ADMIN_LOGIN_PAGE, DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";

export async function login(values) {
  const validatedFields = LoginUserSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { dni } = validatedFields.data

  const rol = (await getUser(dni))?.rol

  if (rol === "entrenador" || rol === "admin") {
    return {
      error: (
        <a href={ADMIN_LOGIN_PAGE} style={{ textDecoration: "none", cursor: "default", color: "white" }}>
          No tienes permisos
        </a>
      )
    }
  }

  try {
    await signIn("credentials", { dni: dni, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Datos incorrectos" }
        default:
          return { error: "Datos incorrectos" }
      }
    }
    throw error
  }
}