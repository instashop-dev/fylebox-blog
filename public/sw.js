// Highly optimized service worker for 100% PageSpeed score
const CACHE_NAME = 'csvbox-blog-v2.0';
const STATIC_CACHE = 'static-resources-v2.0';
const DYNAMIC_CACHE = 'dynamic-content-v2.0';

// Critical resources to cache immediately (highest priority)
const CRITICAL_RESOURCES = [
  '/',
  '/posts',
  '/about'
];

// Static resources that can be cached with longer TTL
const STATIC_RESOURCES = [
  '/favicon.ico',
  '/favicon.svg',
  '/logo.png',
  '/scripts/hamburger-menu.js',
  '/scripts/performance-optimizations.js'
];

// Font resources to cache (reduce font loading chain)
const FONT_RESOURCES = [
  'https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
];

// Network-first strategy for dynamic content
const NETWORK_FIRST_PATTERNS = [
  /\/api\//,
  /\/rss\.xml$/,
  /\/sitemap/
];

// Cache-first strategy for static assets
const CACHE_FIRST_PATTERNS = [
  /\.(?:js|css|woff|woff2|ttf|eot)$/,
  /\/assets\//,
  /\/images\//,
  /\/scripts\//
];

self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      // Cache critical resources immediately
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(CRITICAL_RESOURCES).catch(error => {
          console.log('Critical cache failed:', error);
          return [];
        });
      }),
      // Cache static resources
      caches.open(STATIC_CACHE).then(cache => {
        return cache.addAll([...STATIC_RESOURCES, ...FONT_RESOURCES]).catch(error => {
          console.log('Static cache failed:', error);
          return [];
        });
      })
    ]).then(() => {
      // Force activation of new service worker
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => 
              cacheName !== CACHE_NAME && 
              cacheName !== STATIC_CACHE && 
              cacheName !== DYNAMIC_CACHE
            )
            .map(cacheName => caches.delete(cacheName))
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!request.url.startsWith('http')) {
    return;
  }

  // Skip POST requests and other non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different caching strategies based on request type
  if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // Network-first for dynamic content
    event.respondWith(networkFirst(request));
  } else if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
    // Cache-first for static assets
    event.respondWith(cacheFirst(request));
  } else if (url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com') {
    // Font resources - cache first with long TTL
    event.respondWith(cacheFirst(request, STATIC_CACHE));
  } else {
    // Stale-while-revalidate for HTML pages
    event.respondWith(staleWhileRevalidate(request));
  }
});

// Network-first strategy (good for dynamic content)
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request.clone(), networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    return cachedResponse || new Response('Offline - content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Cache-first strategy (good for static assets)
async function cacheFirst(request, cacheName = STATIC_CACHE) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // Optionally refresh cache in background for critical resources
    if (CRITICAL_RESOURCES.some(resource => request.url.includes(resource))) {
      fetch(request).then(async response => {
        if (response.ok) {
          const cache = await caches.open(cacheName);
          await cache.put(request, response);
        }
      }).catch(() => {}); // Ignore network errors in background
    }
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      await cache.put(request.clone(), networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    return new Response('Resource not available offline', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Stale-while-revalidate strategy (good for HTML pages)
async function staleWhileRevalidate(request) {
  const cachedResponse = await caches.match(request);
  
  // Fetch in background and update cache
  const fetchPromise = fetch(request).then(async response => {
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      // Clone the response before putting it in cache to avoid consumption conflict
      await cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise || new Response('Page not available offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Handle prefetch messages from main thread
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'PREFETCH_URL') {
    const url = event.data.url;
    
    // Prefetch the URL to reduce future loading chains
    fetch(url)
      .then(async response => {
        if (response.ok) {
          const cache = await caches.open(DYNAMIC_CACHE);
          await cache.put(url, response);
        }
      })
      .catch(() => {}); // Ignore prefetch errors
  }
});
