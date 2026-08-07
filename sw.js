const CACHE_NAME = "lee-mobile-v3";

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

// ===============================
// INSTALL
// ===============================

self.addEventListener("install", function(event) {

event.waitUntil(

    caches.open(CACHE_NAME)
        .then(function(cache) {

            return cache.addAll(APP_FILES);

        })

);

self.skipWaiting();

});

// ===============================
// ACTIVATE
// ===============================

self.addEventListener("activate", function(event) {

event.waitUntil(

    caches.keys()
        .then(function(cacheNames) {

            return Promise.all(

                cacheNames
                    .filter(function(name) {

                        return name !== CACHE_NAME;

                    })
                    .map(function(name) {

                        return caches.delete(name);

                    })

            );

        })

);

self.clients.claim();

});

// ===============================
// FETCH
// ===============================

self.addEventListener("fetch", function(event) {

// Only handle GET requests
if (event.request.method !== "GET") {
    return;
}


// Don't intercept external services
const url = event.request.url;

if (
    url.includes("firebaseio.com") ||
    url.includes("googleapis.com") ||
    url.includes("gstatic.com") ||
    url.includes("emailjs.com") ||
    url.includes("cdn.jsdelivr.net")
) {

    return;

}


event.respondWith(

    caches.match(event.request)

        .then(function(cachedResponse) {

            // Use cached file if available
            if (cachedResponse) {

                return cachedResponse;

            }

            // Otherwise request it from the network
            return fetch(event.request)

                .then(function(networkResponse) {

                    return networkResponse;

                });

        })

        .catch(function() {

            // If navigation fails while offline,
            // show the homepage
            if (event.request.mode === "navigate") {

                return caches.match("./index.html");

            }

        })

);

});
