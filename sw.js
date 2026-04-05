const CACHE_NAME = 'enlace-pos-v3';
const ASSETS = [
  './',
  './index.html',
  './script.js',
  './manifest.json',
  'https://cdn.tailwindcss.com'
];

// Instalación
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Intercepción de peticiones (La magia del Offline)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => {
      // 1. Si está en el caché (como el CSV), lo devolvemos
      const fetchPromise = fetch(e.request).then(networkResponse => {
        // 2. Si hay red, guardamos la copia nueva en el caché
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(e.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
          // Si falla la red (modo avión), no pasa nada, ya servimos la de caché
      });

      return cachedResponse || fetchPromise;
    })
  );
});