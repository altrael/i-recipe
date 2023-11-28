<template>
  <div>
    <div v-if="data">
      <!-- Display ComponentA when data exists -->
      <ListRecipe :data="data" />
    </div>

    <div v-else>
      <!-- Display ComponentB when data doesn't exist -->
      <EmptyRecipe />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import ListRecipe from './recipe/ListRecipe.vue'
import EmptyRecipe from './recipe/EmptyRecipe.vue'

const data = ref(null)

onMounted(async () => {
  // Fetch data from an API (replace URL with your API endpoint)
  const response = await fetch('https://65571769bd4bcef8b6120891.mockapi.io/api/v1/recipes')

  // Set the fetched data
  data.value = await response.json()
  data.value = null
})
</script>
