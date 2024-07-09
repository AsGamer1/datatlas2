"use server";

import { LoginAdminSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUser } from "@/data/user";
import Link from "next/link";

export async function login(values) {
  const validatedFields = LoginAdminSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni, password } = validatedFields.data

  const rol = (await getUser(dni))?.rol

  if (rol === "atleta" || !rol) {
    return {
      error: (
        <Link href="/login" className="underline">
          No tienes permisos
        </Link>
      )
    }
  }

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