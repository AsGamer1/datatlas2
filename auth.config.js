import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginSchema } from "@/schemas";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if(validatedFields.success) {
          const { nombre, fecha } = validatedFields.data

          const usuario = await getUser(nombre)
          if (!usuario) return null

          const fechaMatch = (fecha===usuario.fecha)

          if (fechaMatch) return user

          
        }
        return null
      }
      
    })
  ],
}