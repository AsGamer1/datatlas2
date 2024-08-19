/* 
  Auth config
  Configuración de los proveedores de credenciales para el archivo @/auth.js
*/

import Credentials from "next-auth/providers/credentials"
import { getUser } from "@/data/user";
import { LoginAdminSchema, LoginUserSchema } from "@/schemas";
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Este proveedor es especial, porque según el usuario se requiere un método de autenticación u otro
        // Primero recogemos el usuario y lo buscamos en la base de datos
        const user = LoginUserSchema.safeParse(credentials)
        if (user.success) {
          const { dni } = user.data
          const usuario = await getUser(dni)
          // Si no se encuentra se devuelve un usuario nulo
          if (!usuario) return null
          // Si el rol del usuario es el de un atleta, se devuelve directamente el usuario
          if (usuario?.rol === "atleta") {
            return usuario
            // Pero si el rol es de entrenador o admin, se comprueba que la contraseña coincida con el hash de la base de datos antes de devolver el usuario
          } else if (usuario?.rol === "entrenador" || usuario?.rol === "admin") {
            const admin = LoginAdminSchema.safeParse(credentials)
            if (admin.success) {
              const { password } = admin.data
              const passwordsMatch = await bcrypt.compare(password, usuario.password)
              if (passwordsMatch) return usuario
            }
          }
        }
        return null
      }
    })
  ],
}