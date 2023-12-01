<template>
  <GeoLocation />
  <div class="flex flex-col w-full md:flex-row">
    <div
      :class="leftContainer"
      class="place-items-center flex items-center justify-center h-screen transition-all duration-150 ease-in"
    >
      <div class="flex flex-col items-center h-screen">
        <!-- Top Part -->
        <div class="flex-grow flex items-end justify-center w-full h-[40%]" :class="textLogo">
          <img
            alt="Vue logo"
            class="logo"
            :class="logo"
            src="@/assets/images/logo.svg"
            width="125"
            height="125"
          />
          <h4 :class="{ textLogo, hidden: isHide }">ecipe</h4>
        </div>

        <!-- Bottom Part -->
        <div class="flex w-full items-center justify-center h-[60%]" :class="navigation">
          <NavigationContent />
        </div>
      </div>
    </div>

    <div class="divider xl:w-[5%] lg:divider-horizontal lg:w-[5%] h-screen md:h-screen sm:h-[5%]">
      DIVIDER
    </div>

    <div
      :class="rightContainer"
      class="place-items-center flex items-center justify-center h-screen w-full transition-all duration-150 ease-in"
    >
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { RouterView, useRouter } from 'vue-router'
import NavigationContent from '../content/NavigationContent.vue'
import { ref } from 'vue'
import GeoLocation from '../utility/GeoLocation.vue'

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
    leftContainer.value =
      'xl:w-[40%] lg:w-[40%] md:h-[10%] sm:h-[10%] bg-white text-slate-950 text-base'
    rightContainer.value = 'xl:w-[55%] lg:w-[55%]'
    textLogo.value = ''
    isHide.value = false
  } else {
    leftContainer.value =
      'xl:w-[20%] lg:w-[20%] md:h-[10%] sm:h-[10%] bg-slate-950 text-white text-sm'
    rightContainer.value = 'xl:w-[90%] lg:w-[90%]'
    navigation.value = ' text-slate-950'
    isHide.value = true
  }
})
</script>
