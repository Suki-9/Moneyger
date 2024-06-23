const CACHE_NAME = 'pwa-sample-caches-v1';
const urlsToCache = [/* filePath */];

self.addEventListener('install', function (e) {
  console.info('install', e);
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', function (e) {
  console.info('activate', e);
});

self.addEventListener('fetch', function (e) {
  console.log('fetch Event!')
  e.respondWith(
    caches
      .match(e.request)
      .then((response) => {
        return response ? response : fetch(e.request);
      })
  );
});
