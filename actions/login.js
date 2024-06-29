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

  try {
    await signIn("credentials", { nombre, fecha, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if(error instanceof AuthError) {
      switch(error.type) {
        case "CredentialsSignin":
          return { error: "Los datos no coinciden" }
        default:
          return { error }
      }
    }
    throw error
  }
}