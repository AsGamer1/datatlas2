"use server";

// Schemas
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login(values) {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Campos inválidos" }
  }

  const { nombre, fecha } = validatedFields.data
  const formatedFecha = fecha.toISOString()

  try {
    await signIn("credentials", { nombre: nombre, nacimiento: formatedFecha, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    console.log(validatedFields.data)
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