'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "loader.css": "3481833d4078d75da0ca1cba0ad7916e",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"main.dart.js": "92fad357ea5ceac6b5aa188b31156cbd",
"index.html": "985e74bfbb874a582f51ab982e0b2f5b",
"/": "985e74bfbb874a582f51ab982e0b2f5b",
"flutter.js": "f85e6fb278b0fd20c349186fb46ae36d",
"manifest.json": "28722ee569dd442c038f7cdaff379adb",
"canvaskit/canvaskit.js": "2bc454a691c631b07a9307ac4ca47797",
"canvaskit/canvaskit.wasm": "bf50631470eb967688cca13ee181af62",
"canvaskit/profiling/canvaskit.js": "38164e5a72bdad0faa4ce740c9b8e564",
"canvaskit/profiling/canvaskit.wasm": "95a45378b69e77af5ed2bc72b2209b94",
"assets/AssetManifest.json": "3af51241f77bdf5aba3c244b410efe06",
"assets/shaders/ink_sparkle.frag": "237ceacd6c04871e538aaa934b1327a3",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/assets/DB/papers/maths.json": "78a490b86919ada88c29349869ad9d5c",
"assets/assets/DB/papers/chemistry.json": "a5cafea246f280b2d4182e41d91b20a9",
"assets/assets/DB/papers/test.dart": "6328b8324a1090e26175d5b2176b70e6",
"assets/assets/DB/papers/bialogy.json": "f0bd12c013767ecd26d080ccdaf83b1a",
"assets/assets/DB/papers/physics.json": "98f160085dd2c7f4925107ea3b9892e6",
"assets/assets/storage_files/physics.png": "ec4ffd5e72a7d160b98b204bbd04a107",
"assets/assets/storage_files/chemistry.png": "7d0256d27c3407d69518951d3514f4f4",
"assets/assets/storage_files/biology.png": "b2583800e0721c2fb91c539612f24b8a",
"assets/assets/storage_files/maths.png": "a8cd643a6950d88b0bb3367a534c53da",
"assets/assets/images/app_splash_logo.png": "5ec7bf4e530968f1e2255c23009c9a96",
"assets/assets/images/app_splash_logo.svg": "2a3bd9f907295714d4883ce062bc0cac",
"assets/assets/images/physics.png": "661afb998e7f942c16f149e9bcb80673",
"assets/assets/images/bulb.svg": "1614e0dbf96569c2d83855471d79e3f6",
"assets/assets/icons/peace.svg": "5b27c2142ee5f647a5f678ac7db8eaa2",
"assets/assets/icons/email.svg": "6018c87e1d3ca82bac28a652b30829f5",
"assets/assets/icons/AppIcons.ttf": "9fae62f87953ca4af217ad77b58e88fd",
"assets/assets/icons/web.svg": "579e22c21a3e6f4c139543d55115fc87",
"assets/assets/icons/menu.svg": "434a62c1ecb4915dc88c6327e3b94b6a",
"assets/assets/icons/trophyoutline.svg": "d07258ab3ed535bab49c6ac247301f8d",
"assets/assets/icons/code.svg": "ed76ff3eeba97abcca242314f776b5e3",
"assets/assets/icons/github.svg": "4df08b5af208a35fcca413e3ab33f5f4",
"assets/assets/icons/menuleft.svg": "41c7969d3ba70c6733226a44fe3d07a0",
"assets/assets/icons/contact.svg": "e87f9d19932e2dbca1634ae8ed68aa4d",
"assets/assets/icons/google.svg": "bdb1c05028cb0faf7779ab812849d110",
"assets/assets/icons/rate.svg": "5b14e7b1aba5c8ccd1a359003613c95c",
"assets/assets/icons/logout.svg": "b1b7227d8ccbfa6f5e6a1255855938be",
"assets/fonts/MaterialIcons-Regular.otf": "95db9098c58fd6db106f1116bae85a0b",
"assets/NOTICES": "121c0ca3fbe39897cf53e9a83f74fd45",
"version.json": "49bdd9afd23988815847a339b7fa5284",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
