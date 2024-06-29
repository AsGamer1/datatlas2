import * as z from "zod"

export const LoginSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  fecha: z.string({ message: "" }).date("")
})

export const RegisterSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  fecha: z.string({ message: "" }).date(""),
  password: z.string({ message: "" }).min(6, { message: "" })
})