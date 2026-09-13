// Service worker mínimo: no guarda nada en caché. Existe para que Mosaic se
// pueda instalar como app y aparezca en el menú "Compartir" de Android
// (share_target en manifest.json), como "Hablar" en iOS o "Leer en voz alta"
// en Samsung Internet.
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function () { /* la red responde directamente */ });
