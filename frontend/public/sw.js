self.addEventListener('install', function (e) {
  console.info('install', e);
});

self.addEventListener('activate', function (e) {
  console.info('activate', e);
});

self.addEventListener('fetch', function (e) {
  console.log('fetch Event!')
});
