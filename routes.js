/*
  En este archivo se encuentran las rutas no privadas de la web
  Estas rutas son importadas en el Middleware para determinar si el usuario puede acceder a los recursos solicitados
*/

// Rutas públicas: accesibles para todo el mundo, con o sin sesión iniciada
export const publicRoutes = [
  "/",
  "/records"
]

// Rutas de autorización: accesibles para aquellos usuarios que no tengan iniciada una sesión
export const authRoutes = [
  "/auth/login",
  "/auth/admin/login",
  "/auth/error"
]

// Rutas de administrador: accesibles por aquellos usuarios con sesión iniciada que tengan el rol de entrenador en la base de datos
export const adminRoutes = [
  "/auth/register",
  "/auth/admin/register"
]

// Prefijo de la API de autorización
export const apiAuthPrefix = "/api/auth"

// Constantes de redirección: después de un login o un logout se redirigirá al usuario a estas rutas
// También se usa para redirigir al usuario cuando no tiene permisos de administrador e intenta acceder a estas rutas
// Se incluye la ruta de login de entrenadores para usarla en la correspondiente acción de servidor
export const DEFAULT_LOGIN_REDIRECT = "/"
export const DEFAULT_LOGOUT_REDIRECT = "/auth/login"
export const ADMIN_LOGIN_PAGE = "/auth/admin/login"