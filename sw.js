const CACHE_NAME = 'razao-de-viver-v6';
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './styles/app.css',
  './js/config.js',
  './js/seed-data.js',
  './js/chords.js',
  './js/store.js',
  './js/ui-public.js',
  './js/ui-admin.js',
  './js/app.js',
  './assets/img/icon-512.png',
  './assets/img/icon-192.png',
  './assets/img/hero-bg.jpg',
  './assets/img/capa-eu-nao-morri-em-vao.jpg',
  './assets/img/capa-minha-obra.jpg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Não intercepta chamadas externas da API do Supabase
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match('./index.html')))
  );
});
