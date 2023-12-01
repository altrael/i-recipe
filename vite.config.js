import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import vue from '@vitejs/plugin-vue'
import workboxConfig from './workbox.config'

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.js',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon.png',
        'mask-icon.svg',
        'clear.svg',
        'cloudy.svg',
        'rain.svg',
        'thunderstorm.svg'
      ],
      manifest: {
        name: 'I-Recipe',
        short_name: 'I-Recipe',
        description: 'Cuisine Online Recipes',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'i-recipe 64 x 64.png',
            sizes: '64x64',
            type: 'image/png'
          },
          {
            src: 'i-recipe 128 x 128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'i-recipe 512 x 512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ]
      }
    })
  ],
  workbox: workboxConfig,
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/css/style.css";`
      }
    }
  },
  daisyui: {
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'dim',
      'nord',
      'sunset'
    ]
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
