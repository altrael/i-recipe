import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching'

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST)

const broadcast = new BroadcastChannel('i-recipe-channel');

self.addEventListener('install', (event) => {
  console.log('Service Worker installed')
})

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated')
})

self.addEventListener('fetch', (event) => {
  console.log('Service Worker fetching:', event.request.url)
})

self.addEventListener("push", async (event) => {
  console.log('event:', event.data.text());
  console.log("push")

  broadcast.postMessage({
    type: 'CRITICAL_SW_UPDATE',
    payload: {
      version: '1.0.1',
      details: 'This is a critical update. Please update your app.'
    }
   });

});

clientsClaim();