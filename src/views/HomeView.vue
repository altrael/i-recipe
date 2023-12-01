<template>
  <div class="">
    <input type="checkbox" v-model="isSynthwave" class="toggle theme-controller" />
    <div :class="{ 'synthwave-theme': isSynthwave }">
      <div class="daisy-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div class="daisy-card p-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
const isSynthwave = ref(false)

// Watch for changes in the isSynthwave variable
watch(isSynthwave, (newValue) => {
  if (newValue) {
    // Apply Synthwave theme
    document.body.classList.add('synthwave-theme')
  } else {
    // Remove Synthwave theme
    document.body.classList.remove('synthwave-theme')
  }
})
</script>

<style scoped>
/* Add your theme styles here */
.synthwave-theme {
  background-color: #2a2139;
  color: #94c7d3;
}

/* Adjust these styles based on your design */
</style>
