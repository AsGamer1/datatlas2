/** @type {import {'next'}".NextConfig"} */
/* 
  Archivo de configuración de NextJS
*/
import withPWAInit from "@ducanh2912/next-pwa";

// Para crear la PWA se utiliza next-pwa (by dyncanh2912)
// En withPWA se definen características iniciales para la PWA
const withPWA = withPWAInit({
  dest: "public",
  reloadOnOnline: true,
  cacheOnFrontendNav: true,
  aggressiveFrontEndNavCaching: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true
  }
});

// Configuración de Next que permite acciones de servidor desde el origen establecido, la web oficial del club
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['portal.atletismeatlas.es']
    }
  }
}

export default withPWA(nextConfig);