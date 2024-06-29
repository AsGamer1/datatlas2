import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginSchema } from "@/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials)

        if(validatedFields.success) {
          const { nombre, fecha } = validatedFields.data
          const formatedFecha = (new Date(fecha)).toISOString()
          const usuario = await getUser(nombre, formatedFecha)

          if (!usuario) return null

          return usuario
        }
        return null
      }
    })
  ],
}