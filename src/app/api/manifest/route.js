export async function GET(request) {
  const userAgent = request.headers.get('user-agent');
  const isAndroid = /android/i.test(userAgent);

  const manifest = isAndroid ? {
    "name": "Atlas",
    "short_name": "Atlas",
    "description": "Aplicación de consulta de la base de datos del CA Atlas",
    "icons": [
      {
        "src": "/icons/icon-192-android.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/icon-512-android.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait"
  } : {
    "name": "Atlas",
    "short_name": "Atlas",
    "description": "Aplicación de consulta de la base de datos del CA Atlas",
    "icons": [
      {
        "src": "/icons/icon-192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any maskable"
      },
      {
        "src": "/icons/icon-512.png",
        "sizes": "512x512",
        "type": "image/png"
      }
    ],
    "theme_color": "#FFFFFF",
    "background_color": "#FFFFFF",
    "start_url": "/",
    "display": "standalone",
    "orientation": "portrait"
  };

  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/json' }
  });
}