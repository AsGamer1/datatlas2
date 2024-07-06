import * as z from "zod"

export const LoginUserSchema = z.object({
  dni: z.string({ message: "" }).min(1, { message: "" })
})

export const RegisterUserSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  dni: z.string({ message: "" }).min(8, { message: "" }),
})

export const LoginAdminSchema = z.object({
  dni: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(1, { message: "" })
})

export const RegisterAdminSchema = z.object({
  dni: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(6, { message: "" })
})