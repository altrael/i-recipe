import './assets/css/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerSW } from 'virtual:pwa-register'
const intervalMS = 3 * 60 * 1000 // 3 minutes

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

app.mount('#app')
