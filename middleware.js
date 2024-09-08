/* 
  Middleware
  Tras definir algunas condiciones, se comprueban en un orden determinado
  Este orden permite reducir la cantidad de código, al no tener que especificar los casos previos al caso actual
*/

import authConfig from "@/auth.config"
import NextAuth from "next-auth"
const { auth } = NextAuth(authConfig)

import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes, trainerRoutes, adminRoutes, DEFAULT_LOGOUT_REDIRECT } from "@/routes"

export default auth((req) => {
  const { nextUrl } = req

  const isLoggedIn = !!req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isApiGooglePlaces = nextUrl.pathname.startsWith("/api/places")
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)
  const isTrainerRoute = trainerRoutes.includes(nextUrl.pathname)
  const isAdminRoute = adminRoutes.includes(nextUrl.pathname)

  // Permite todo acceso a la ruta de la API de autorización
  if (isApiAuthRoute) {
    return null
  }

  // Si es una ruta de autorización, solo permite el acceso si el usuario no tiene iniciada una sesión
  // En caso de tenerla iniciada, se le redirigirá al inicio
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  // Si el usuario no ha iniciado sesión y trata de acceder a una ruta protegida, se le redirige al login
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL(DEFAULT_LOGOUT_REDIRECT, nextUrl))
  }

  // Si es una ruta para entrenadores, solo permite el acceso si el rol del usuario es el de entrenador o admin
  // Este rol se almacena en una propiedad libre del objeto user, perteneciente a la sesión activa
  // Tras intentar crear una propiedad personalizada, sin éxito, se decidió almacenarlo en "image"
  if (isTrainerRoute) {
    if (isLoggedIn) {
      if (req.auth.user.image !== "entrenador" && req.auth.user.image !== "admin") {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
    }
    return null
  }

  if (isApiGooglePlaces) {
    if (isLoggedIn) {
      if (req.auth.user.image !== "entrenador" && req.auth.user.image !== "admin") {
        return Response.json({ error: "Autenticación fallida" }, { status: 403 })
      }
    }
    return null
  }

  // Si es una ruta de admin, solo permite el acceso si el rol del usuario es de admin (reservado para el dev y el presi)
  if (isAdminRoute) {
    if (isLoggedIn) {
      if (req.auth.user.image !== "admin") {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
      }
    }
    return null
  }

  return null
})

// Matcher: se aplica el Middleware a las páginas que cumplan con las expresiones regulares dadas
export const config = {
  matcher: ["/api/places", "/((?!api|_next/static|_next/image|icons|icon.png|sw.js).*)", "/"]
}