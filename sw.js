self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open("nimfence-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/styles.css",
        "/script.js",
        "/assets/favicon.jpg",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
