import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginStringSchema } from "@/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginStringSchema.safeParse(credentials)
        
        if(validatedFields.success) {
          const { nombre, fecha } = validatedFields.data
          const usuario = await getUser(nombre, fecha)

          if (!usuario) return null

          return usuario
        }
        return null
      }
    })
  ],
}