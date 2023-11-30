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
    }
  ]
}
