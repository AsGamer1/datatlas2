import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginUserSchema } from "@/schemas";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginUserSchema.safeParse(credentials)

        if(validatedFields.success) {
          const { dni } = validatedFields.data
          const usuario = await getUser(dni)
          console.log(usuario)
          if (!usuario) return null

          return usuario
        }
        return null
      }
    })
  ],
}