import * as z from "zod"

export const LoginSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  fecha: z.date()
})

export const LoginStringSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  fecha: z.string({ message: "" })
})

export const RegisterSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  fecha: z.date(),
  password: z.string({ message: "" }).min(6, { message: "" })
})