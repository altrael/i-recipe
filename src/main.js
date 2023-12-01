import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { create, daisyui } from 'daisyui'
import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
const intervalMS = 7 * 24 * 60 * 60 * 1000 // days, hours, minutes, seconds, ms

const updateSW = registerSW({
  onRegistered(registration) {
    if (registration) {
      setInterval(() => {
        registration.update()
      }, intervalMS)
    }
  }
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(daisyui)
app.mount('#app')
