const CACHE_NAME = "lee-mobile-v2";

const APP_FILES = [
"./",
"./index.html",
"./services.html",
"./prices.html",
"./booking.html",
"./membership.html",
"./about.html",
"./contact.html",
"./confirmation.html",
"./login.html",
"./admin.html",
"./style.css",
"./script.js",
"./booking.js",
"./membership.js",
"./price.js",
"./reviews.js",
"./firebase.js",
"./auth.js",
"./manifest.json"
];

// Install
self.addEventListener("install", (event) => {

event.waitUntil(

caches.open(CACHE_NAME)
  .then((cache) => {

    return cache.addAll(APP_FILES);

  })

);

self.skipWaiting();

});

// Activate
self.addEventListener("activate", (event) => {

event.waitUntil(

caches.keys().then((cacheNames) => {

  return Promise.all(

    cacheNames
      .filter((name) => name !== CACHE_NAME)
      .map((name) => caches.delete(name))

  );

})

);

self.clients.claim();

});

// Fetch
self.addEventListener("fetch", (event) => {

// Don't intercept Firebase, EmailJS or external services
if (
event.request.url.includes("firebaseio.com") ||
event.request.url.includes("googleapis.com") ||
event.request.url.includes("gstatic.com") ||
event.request.url.includes("emailjs.com") ||
event.request.url.includes("cdn.jsdelivr.net")
) {

return;

}

event.respondWith(

caches.match(event.request)
  .then((cachedResponse) => {

    if (cachedResponse) {

      return cachedResponse;

    }

    return fetch(event.request)
      .then((networkResponse) => {

        return networkResponse;

      });

  })
  .catch(() => {

    return caches.match("./index.html");

  })

);

});
