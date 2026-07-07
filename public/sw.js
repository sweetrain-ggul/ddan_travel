const CACHE_NAME = "vietnam-currency-calculator-v2";
const APP_SHELL = `${self.location.origin}/ddan_travel/`;

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isSameOrigin = requestUrl.origin === self.location.origin;
  const isNavigationRequest =
    event.request.mode === "navigate" || event.request.destination === "document";

  if (isNavigationRequest) {
    event.respondWith(
      (async () => {
        try {
          const response = await fetch(event.request);
          if (response && response.ok && isSameOrigin) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(APP_SHELL, response.clone());
          }
          return response;
        } catch {
          const cached = await caches.match(APP_SHELL);
          if (cached) {
            return cached;
          }

          throw new Error("Offline");
        }
      })(),
    );
    return;
  }

  event.respondWith(
    (async () => {
      const cached = await caches.match(event.request);
      if (cached) {
        return cached;
      }

      try {
        const response = await fetch(event.request);
        if (response && response.ok && isSameOrigin) {
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, response.clone());
        }
        return response;
      } catch {
        throw new Error("Offline");
      }
    })(),
  );
});
