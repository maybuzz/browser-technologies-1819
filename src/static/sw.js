const CACHE_NAME = 'my-site-cache-v1'
const urlsToCache = [
  '/',
  '/offline',
  '/error',
  '/css/styles.css',
  '/js/main.js',
  '/db/lists.json'
]

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened caching')
        return cache.addAll(urlsToCache)
      })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then(function(cache){
        return cache.match(event.request)
          .then(function(response) {
            // Cache hit - return response
            if (response) {
              return response
            }
            return fetch(event.request)
              .catch(err => caches
                .open(CACHE_NAME)
                .then(cache => cache.match('/offline')
                  .then(res => res)
                )
              )
          })
      })
  )
})
