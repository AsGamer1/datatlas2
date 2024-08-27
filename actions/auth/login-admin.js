"use server";

/* 
  Acción de servidor para iniciar sesión como entrenador
  Extrae los campos del formulario y busca el usuario a partir del DNI
  Una vez lo encuentra, comprueba su rol. Si es atleta, redirige al usuario a la página de inicio de sesión para atletas
  En caso de que sea entrenador, trata de iniciar sesión y devuelve el mismo error tanto si no encuentra al usuario como si los datos son incorrectos
*/

import { LoginAdminSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT, DEFAULT_LOGOUT_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";
import { redirect } from "next/navigation";

export async function login(values) {
  const validatedFields = LoginAdminSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Campos inválidos" }

  const { dni, password } = validatedFields.data

  const rol = (await getUser(dni))?.rol

  if (rol === "atleta") redirect(DEFAULT_LOGOUT_REDIRECT)

  try {
    await signIn("credentials", { dni: dni, password: password, redirectTo: DEFAULT_LOGIN_REDIRECT })
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