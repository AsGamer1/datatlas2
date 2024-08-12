/* 
  Auth
  En este archivo se declara configuración importante para la autorización en la web
  Se complementa con el archivo @/auth.config.js
*/

import NextAuth from "next-auth"
import authConfig from "@/auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

import { getUserById } from "@/data/user";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    signOut: "/auth/logout"
  },
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
        session.user.birthdate = token.birthdate
        session.user.image = token.picture
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token
      const existingUser = await getUserById(token.sub)
      if (!existingUser) return token
      token.name = existingUser.nombre
      token.birthdate = existingUser.nacimiento
      token.picture = existingUser.rol
      return token
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})