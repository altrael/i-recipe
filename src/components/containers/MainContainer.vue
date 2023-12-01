<template>
  <div class="lg:flex lg:flex-row lg:w-full md:flex md:flex-col md:w-full" >
    <div
      :class="leftContainer"
      class="lg:place-items-center lg:flex lg:items-center lg:h-screen transition-all duration-150 ease-in"
    >
      <div
        class="lg:flex lg:flex-col lg:items-center lg:h-screen md:flex md:flex-row md:items-center: md:place-content-center"
      >
        <!-- Top Part -->
        <div
          class="lg:flex-grow lg:flex lg:items-end lg:justify-center lg:w-full lg:h-[40%]"
          :class="textLogo"
        >
          <img
            alt="I-Recipe Logo"
            class="logo"
            :class="logo"
            src="@/assets/images/icons/i-recipe.svg"
            width="125"
            height="125"
          />
          <h4 :class="{ textLogo, hidden: isHide }">ecipe</h4>
        </div>

        <!-- Bottom Part -->
        <div
          class="lg:flex lg:w-full lg:items-center lg:flex-col lg:justify-center lg:h-[60%]"
          :class="navigation"
        >
          <NavigationContent />

          <GeoLocation hidden: isHide/>
          <Weather hidden: isHide/>
        </div>
      </div>
    </div>

    <div
      :class="rightContainer"
      class="place-items-center flex items-center justify-center h-screen transition-all duration-150 ease-in"
    >
      <RouterView />
    </div>
  </div>

  <Footer />
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import { ref } from 'vue'
import GeoLocation from '../utility/GeoLocation.vue'
import Weather from '../utility/Weather.vue'
import Footer from '../content/Footer.vue'
import NavigationContent from '../content/navigation/NavigationContent.vue'

const leftContainer = ref(null)
const rightContainer = ref(null)
const navigation = ref(null)
const logo = ref(null)
const textLogo = ref(null)
const isHide = ref(false)

const router = useRouter()

// Function to change the class
router.beforeEach((to) => {
  console.log(to.path)
  if (to.path == '/') {
    console.log('true')
    leftContainer.value = 'lg:w-[40%] md:h-[10%] bg-white text-slate-950 text-base'
    rightContainer.value = 'xl:w-[55%] lg:w-[55%]'
    textLogo.value = 'lg: md:'
    isHide.value = false
  } else {
    leftContainer.value = 'lg:w-[20%] md:h-[10%] bg-slate-950 text-white text-sm'
    rightContainer.value = 'lg:w-[90%]'
    navigation.value = ' text-slate-950'
    isHide.value = true
  }
})
</script>