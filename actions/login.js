"use server";

import { LoginUserSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values) {
  const validatedFields = LoginUserSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { dni } = validatedFields.data

  try {
    await signIn("credentials", { dni: dni, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Datos incorrectos" }
        default:
          return { error: error }
      }
    }
    throw error
  }
}