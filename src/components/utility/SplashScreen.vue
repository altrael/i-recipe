<template>
  <div v-if="showSplash" class="splash-screen">
    <img src="@/assets/images/icons/i-recipe.svg" alt="Logo" width="125" height="125" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSplash: true
    }
  },
  mounted() {
    // Automatically hide the splash screen after .5 seconds
    setTimeout(() => {
      this.showSplash = false
    }, 500)
  }
}
</script>

<style scoped>
/* Add your splash screen styles here */
.splash-screen {
  /* Style the splash screen container */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff; /* Set background color */
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
