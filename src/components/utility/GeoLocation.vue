<template>
  <div>
    <!-- Print Location and Weather -->
    <p v-if="location">{{ location }}</p>
  </div>
</template>

<script setup>
import { useGeolocation } from '@vueuse/core'
import { ref, watchEffect } from 'vue'

const { coords } = useGeolocation()
const location = ref(null)
const apiKey = import.meta.env.VITE_OPEN_WEATHER_CREDENTIAL
const geoUrl = import.meta.env.VITE_OPEN_WEATHER_GEOAPI
const prevLatitude = ref()
const prevLongitude = ref()

watchEffect(() => {
  const fetchLocation = async (latitude, longitude) => {
    try {
      if (
        latitude !== undefined &&
        longitude !== undefined &&
        latitude !== Infinity &&
        longitude !== Infinity
      ) {
        // Fetch location data
        const locationResponse = await fetch(
          `${geoUrl}lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
        )

        if (!locationResponse.ok) {
          throw new Error('Failed to fetch location data')
        }

        const locationData = await locationResponse.json()
        const cityName = locationData[0]?.name || 'Unknown Location'
        location.value = cityName

        // Save the fetched location data to Workbox cache
        const locationCache = await caches.open('openweathermap-geo-cache')
        const locationCacheKey = new Request('/api/location')
        const locationCacheResponse = new Response(JSON.stringify(locationData))
        await locationCache.put(locationCacheKey, locationCacheResponse)
      }
    } catch (error) {
      console.error('Error fetching data:', error.message)
    }
  }

  if (
    (coords.value &&
      coords.value.latitude !== undefined &&
      coords.value.longitude !== undefined &&
      coords.value.latitude !== Infinity &&
      coords.value.longitude !== Infinity &&
      coords.value.latitude !== 'Infinity' &&
      coords.value.longitude !== 'Infinity' &&
      !isNaN(coords.value.latitude) &&
      !isNaN(coords.value.longitude) &&
      prevLatitude.value != coords.value.latitude) ||
    prevLongitude.value != coords.value.longitude
  ) {
    fetchLocation(coords.value.latitude, coords.value.longitude)
    prevLatitude.value = coords.value.latitude
    prevLongitude.value = coords.value.longitude
  }
})
</script>
