<template>
  <div class="flex flex-row space-x-2">
    <!-- Print Location and Weather -->
    <p v-if="weather">{{ weather }}</p>
    <img v-if="weatherImage" :src="weatherImage" width="25" height="25" />
  </div>
</template>

<script setup>
import { useGeolocation } from '@vueuse/core'
import { ref, onMounted, watchEffect } from 'vue'

const { coords } = useGeolocation()
const weather = ref(null)
const weatherImage = ref(null)
const apiKey = import.meta.env.VITE_OPEN_WEATHER_CREDENTIAL
const weatherUrl = import.meta.env.VITE_OPEN_WEATHER_API
const prevLatitude = ref()
const prevLongitude = ref()

const fetchWeatherData = async (latitude, longitude) => {
  try {
    if (latitude !== undefined && longitude !== undefined) {
      // Fetch weather data
      const weatherResponse = await fetch(
        `${weatherUrl}lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )

      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const weatherData = await weatherResponse.json()
      console.log(weatherData)
      const mainWeather = weatherData.weather[0]?.main || 'Unknown Weather'
      weather.value = `Weather: ${mainWeather}`

      // Set weather image based on weather condition
      if (mainWeather.toLowerCase() === 'clouds') {
        weatherImage.value = '/icons/cloudy.svg'
      } else if (mainWeather.toLowerCase() === 'clear') {
        weatherImage.value = '/icons/clear.svg'
      } else if (mainWeather.toLowerCase() === 'thunderstorm') {
        weatherImage.value = '/icons/thunderstorm.svg'
      } else if (mainWeather.toLowerCase() === 'rain') {
        weatherImage.value = '/icons/rain.svg'
      } else {
        weatherImage.value = null
      }

      // Save the fetched weather data to Workbox cache
      const weatherCache = await caches.open('openweathermap-weather-cache')
      const weatherCacheKey = new Request('/api/weather')
      const weatherCacheResponse = new Response(JSON.stringify(weatherData))
      await weatherCache.put(weatherCacheKey, weatherCacheResponse)
    } else {
      console.error('Latitude or longitude is undefined.')
    }
  } catch (error) {
    console.error('Error fetching data:', error.message)
  }
}

onMounted(() => {
  // Fetch initial weather data
  fetchWeatherData(coords.value.latitude, coords.value.longitude)

  // Fetch weather data every 10 minutes
  const fetchInterval = setInterval(
    () => {
      fetchWeatherData(coords.value.latitude, coords.value.longitude)
    },
    10 * 60 * 1000
  ) // 10 minutes in milliseconds

  // Cleanup interval when component is unmounted
  watchEffect(() => {
    return () => clearInterval(fetchInterval)
  })
})

watchEffect(() => {
  // Watch for changes in coordinates and fetch weather data
  if (
    coords.value &&
    coords.value.latitude !== undefined &&
    coords.value.longitude !== undefined &&
    (prevLatitude.value !== coords.value.latitude || prevLongitude.value !== coords.value.longitude)
  ) {
    fetchWeatherData(coords.value.latitude, coords.value.longitude)
    prevLatitude.value = coords.value.latitude
    prevLongitude.value = coords.value.longitude
  }
})
</script>
