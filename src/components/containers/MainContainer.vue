<template>
  <div class="flex flex-col w-full h-fit">
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
            class="flex flex-row items-end"
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
            <p :class="{ textLogo, hidden: isHide }" class="text-xl">ecipe</p>
          </div>

          <!-- Bottom Part -->
          <div
            class="lg:flex lg:w-full lg:items-center lg:flex-col lg:justify-center lg:h-[60%]"
          >
            <NavigationContent />

            <GeoLocation hidden: isHide/>
            <Weather hidden: isHide/>
          </div>
        </div>
      </div>

      <div
        :class="rightContainer"
        class="place-items-center flex justify-center h-fit w-full transition-all duration-150 ease-in"
      >
        <RouterView />
      </div>
    </div>
    <Footer />
  </div>

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
const logo = ref(null)
const textLogo = ref(null)
const isHide = ref(false)

const router = useRouter()

// Function to change the class
router.beforeEach((to) => {
  if (to.path == '/') {
    leftContainer.value = 'lg:w-[40%] md:h-[10%] text-base'
    rightContainer.value = 'xl:w-[55%] lg:w-[55%]'
    textLogo.value = 'lg: md:'
    isHide.value = false
  } else {
    leftContainer.value = 'lg:w-[20%] md:h-[10%] text-sm'
    rightContainer.value = 'lg:w-[90%]'
    isHide.value = true
  }
})
</script>
