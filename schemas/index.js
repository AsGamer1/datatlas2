/* 
  Esquemas de formularios validados con Zod
*/
import * as z from "zod"

/*
  Auth Schemas
*/

// Esquema de inicio de sesión de un atleta
export const LoginUserSchema = z.object({
  dni: z.string({ message: "" }).min(1, { message: "" })
})

// Esquema de registro de un atleta
export const RegisterUserSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  dni: z.string({ message: "" }).min(8, { message: "" }),
  nacimiento: z.coerce.date({ message: "" })
})

// Esquema de inicio de sesión de un entrenador
export const LoginAdminSchema = z.object({
  dni: z.string({ message: "" }).min(1, { message: "" }),
  password: z.string({ message: "" }).min(1, { message: "" })
})

// Esquema de registro de un entrenador
export const RegisterAdminSchema = z.object({
  nombre: z.string({ message: "" }).min(1, { message: "" }),
  dni: z.string({ message: "" }).min(1, { message: "" }),
  nacimiento: z.coerce.date({ message: "" }),
  password: z.string({ message: "" }).min(6, { message: "" })
})

/*
  Data Schemas
*/
export const AddEventoSchema = z.object({
  id: z.any({message: ""}),
  Evento: z.string({ message: "" }).min(1, { message: "" }),
  Fecha: z.coerce.date({ message: "" }),
  Lugar: z.string({ message: "" }).min(1, { message: "" })
})