import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute, setDefaultHandler, setCatchHandler } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate, NetworkOnly } from 'workbox-strategies'
import { BackgroundSyncPlugin } from 'workbox-background-sync'

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST)

// const postQueue = new workbox.backgroundSync.Queue('postQueue', {
//   maxRetentionTime: 24 * 60 // Retry failed requests for up to 24 hours
// })

// Register a route to handle POST requests
// registerRoute(
//   new RegExp('https://65571769bd4bcef8b6120891.mockapi.io/api/v1'),
//   async ({ request }) => {
//     try {
//       const response = await fetch(request.clone())
//       return response
//     } catch (error) {
//       // Queue failed requests for background sync
//       await postQueue.pushRequest({ request })
//       throw error
//     }
//   },
//   'POST'
// )

// Cache API responses using CacheFirst strategy
registerRoute(
  new RegExp('/api/location'),
  new CacheFirst({
    cacheName: 'openweathermap-geo-cache'
  })
)

registerRoute(
  new RegExp('/api/weather'),
  new CacheFirst({
    cacheName: 'openweathermap-weather-cache'
  })
)

// Set up background sync for the postQueue
// self.addEventListener('activate', (event) => {
//   console.log('Queue Activated')
//   event.waitUntil(postQueue.replayRequests())
// })

// Fallback for navigation requests
setDefaultHandler(new StaleWhileRevalidate())
