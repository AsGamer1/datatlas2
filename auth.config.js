import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginAdminSchema } from "@/schemas";
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginAdminSchema.safeParse(credentials)

        if (validatedFields.success) {
          const { dni, password } = validatedFields.data
          const usuario = await getUser(dni)
          if (!usuario) return null
          if (usuario?.rol === "atleta") {
            return usuario
          } else if (usuario?.rol === "entrenador") {
            const passwordsMatch = await bcrypt.compare(password, usuario.password)
            if (passwordsMatch) return usuario
          }
        }
        return null
      }
    })
  ],
}