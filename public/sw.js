const CACHE_NAME = 'tj-expedition-v1';
const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/explore',
  '/trip-builder',
  '/favicon.svg',
  '/manifest.webmanifest',
];

// Install Event: Precaching Core Expedition Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('[SW] Precache non-critical asset failure:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up legacy caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First with Offline Fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Skip non-GET and chrome-extension schemes
  if (request.method !== 'GET' || !request.url.startsWith('http')) {
    return;
  }

  // Handle HTML document navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone and cache the live page for future offline use
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          return response;
        })
        .catch(async () => {
          // Try matching requested page from cache, or fall back to /offline
          const cached = await caches.match(request);
          if (cached) return cached;
          const offlineFallback = await caches.match('/offline');
          return offlineFallback || new Response('<h1>Expedition Mode Active (Offline)</h1><p>Please check your cached itineraries at /offline.</p>', {
            headers: { 'Content-Type': 'text/html' },
          });
        })
    );
    return;
  }

  // Stale-While-Revalidate for static assets (styles, scripts, images)
  event.respondWith(
    caches.match(request).then((cached) => {
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => cached);

      return cached || fetchPromise;
    })
  );
});
