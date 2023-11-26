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
import { ref, onMounted } from 'vue'
import ListRecipe from './recipe/ListRecipe.vue'
import EmptyRecipe from './recipe/EmptyRecipe.vue'

const data = ref(null)

onMounted(async () => {
  // Fetch data from an API (replace URL with your API endpoint)
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const result = await response.json()

  // Set the fetched data
  data.value = result
  data.value = null
})
</script>
