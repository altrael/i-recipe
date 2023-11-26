import { precacheAndRoute } from 'workbox-precaching'

// self.__WB_MANIFEST is default injection point
precacheAndRoute(self.__WB_MANIFEST)

self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
  // ... other logic
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
  // ... other logic
})

self.addEventListener('fetch', (event) => {
  console.log('Service Worker fetching:', event.request.url)
  // ... other logic
})
