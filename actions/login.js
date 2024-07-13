"use server";

import { LoginUserSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";

export async function login(values) {
  const validatedFields = LoginUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni } = validatedFields.data

  const rol = (await getUser(dni))?.rol

  if (rol === "entrenador") {
    return {
      error: (
        <a href="/login-admin" className="cursor-default">
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