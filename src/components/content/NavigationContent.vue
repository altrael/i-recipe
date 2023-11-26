<template>
  <nav>
    <ul :class="navUl">
      <li><RouterLink to="/">Home</RouterLink></li>
      <li><RouterLink to="/recipe">Recipe</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const navUl = ref(false)

router.beforeEach((to) => {
  console.log(to.path)
  if (to.path == '/') {
    console.log('true')
    navUl.value =
      'menu lg:menu-horizontal bg-base-200 rounded-box lg:mb-64 transition-all duration-150 ease-in'
  } else {
    navUl.value =
      'menu lg:menu-vertical bg-base-200 rounded-box lg:mb-32 transition-all duration-150 ease-in'
  }
})
</script>
