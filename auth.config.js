import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getUser } from "@/data/user";
import { AdminLoginSchema, LoginSchema } from "@/schemas";
 
// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)
        const adminValidatedFields = AdminLoginSchema.safeParse(credentials)

        if(validatedFields.success) {
          const { nombre, fecha } = validatedFields.data

          const usuario = await getUser(nombre)
          if (!usuario) return null

          const fechaMatch = (fecha===usuario.fecha)

          if (fechaMatch) return user

          
        } else if (adminValidatedFields.success) {
          const { nombre, password } = adminValidatedFields.data

          const usuario = await getUser(nombre)
          if (!usuario) return null

          const pwMatch = bcrypt.compare(password,usuario.password)

          if (pwMatch) return user
        }
        return null
      }
      
    })
  ],
}