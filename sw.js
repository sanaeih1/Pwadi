const cacheName = 'pwa-dialysis-v1';
const assetsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Caching assets');
        return cache.addAll(assetsToCache);
      })
      .catch(err => console.error('Error during installation:', err))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(name => {
          if (name !== cacheName) {
            console.log('Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached asset if available, otherwise fetch from network
        return response || fetch(event.request);
      })
      .catch(err => console.error('Fetch error:', err))
  );
});