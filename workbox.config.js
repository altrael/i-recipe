// workbox-config.js
export default {
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\.openweathermap\.org\/geo\/1.0\/reverse\?.*$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'openweathermap-geo-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 3600
        },
        cacheableResponse: {
          statuses: [0, 200]
        },
        backgroundSync: {
          name: 'postQueue',
          options: {
            maxRetentionTime: 24 * 60
          }
        }
      }
    },
    {
      urlPattern: /^https:\/\/65571769bd4bcef8b6120891.mockapi.io\/api\/v1$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'i-recipe-cache',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 3 // <== 3 second for dev
        },
        cacheableResponse: {
          statuses: [0, 200]
        },
        backgroundSync: {
          name: 'updateQueue',
          options: {
            maxRetentionTime: 24 * 60
          }
        }
      }
    }
  ]
}
