/*
  Toy Haven - Service Worker
  ---------------------------------
  This is a very small service worker used to demonstrate basic PWA behaviour.
  What it does:
  1. On "install", it opens a cache and stores the core files of the site
     (the "app shell") so the site can still open when offline.
  2. On "fetch" (whenever the browser requests a file), it first checks the
     cache. If the file is cached, it is returned instantly. If not, it is
     fetched from the network as normal.
  This is intentionally simple so it is easy to explain in a viva.
*/

const CACHE_NAME = "toy-haven-cache-v1";

// The core files that make the site work. These are cached as soon as the
// service worker is installed.
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./products.html",
  "./cart.html",
  "./checkout.html",
  "./wishlist.html",
  "./feedback.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./favicon.svg"
];

// INSTALL: cache the core assets so the site works offline.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE: remove any old caches from previous versions of the service worker.
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// FETCH: try the cache first, then fall back to the network.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
