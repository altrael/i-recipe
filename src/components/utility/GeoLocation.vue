<template>
  <div>
    <div>
      <UseGeolocation v-slot="{ coords: { latitude, longitude } }">
        Latitude: {{ latitude }} Longitude: {{ longitude }}
      </UseGeolocation>
    </div>
  </div>
</template>
<script setup>
import { useGeolocation } from '@vueuse/core'
import { UseGeolocation } from '@vueuse/components'
import { ref, onMounted } from 'vue'
const { coords } = useGeolocation()

const location = ref(null)
const apiKey = '3af542017b67c1d012d168883c257541'

const fetchLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `//api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch location data')
    }
    console.log(response)
    const data = await response.json()
    const cityName = data[0]?.name || 'Unknown Location'
    location.value = cityName
  } catch (error) {
    console.error('Error fetching location:', error.message)
  }
}

onMounted(() => {
  if (coords) {
    fetchLocation(coords.latitude, coords.longitude)
  }
})
</script>
