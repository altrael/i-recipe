<template>
  <div class="flex flex-col items-center md:pt-32 pt-8 w-full h-fit">
    <div v-if="showToast" class="toast toast-top toast-end transition-opacity ease-in-out">
      <div v-if="success" class="alert alert-success">
        <span>Recipe Updated Successfully.</span>
      </div>
      <div v-else class="alert alert-error">
        <span>Failed to Update Recipe.</span>
      </div>
    </div>

    <!-- MODAL CAMERA -->
    <dialog id="cameraModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button @click="showOrHideCamera" class="btn btn-sm btn-circle btn-ghost bg-gray-600 absolute right-2 top-2">✕</button>
        </form>

        <div class="text-center">
          <div v-if="enabled && !capturedImage">
            <video ref="video" muted autoplay class="h-100 w-auto" />
          </div>
          <div v-if="capturedImage">
            <img :src="capturedImage" alt="Captured" />
          </div>
          <div v-if="enabled" class="mt-4">
        <button class="btn btn-primary" @click="takePicture" :disabled="!enabled">
          {{ !capturedImage ? 'Take Picture' : 'Retake Picture' }}
        </button>
            <div v-if="capturedImage" class="mt-2">
              <form method="dialog">
                <button class="btn btn-success" @click="choosePicture">Choose Picture</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </dialog>

    <!-- FORM -->
    <div v-if="!enabled" class="flex flex-col justify-center items-center w-3/4">
      <div class="flex items-center justify-center mb-3 w-full">
        <p class="text-lg font-bold">Recipe List</p>
      </div>
      <div v-if="fetching">
        <span class="loading loading-ring loading-lg"></span>
      </div>
      <div v-else class="p-7 rounded-xl border border-gray-500 w-full">
        <div class="mb-3 font-bold flex items-center">
            <input
              v-model="data.recipe_name"
              type="text"
              placeholder="Recipe Name"
              class="bg-transparent focus:outline-none grow me-3"
          />
        </div>
        <div v-if="data.steps.length > 0">
          <div v-for="(step, index) in data.steps" :key="index" class="flex flex-col">
            <template v-if="step.type === 'text'">
              <span class="label label-text font-bold">Step {{ index + 1 }}</span>
              <div class="flex flex-col md:flex-row">
                  <input
                    v-model="step.value"
                    type="text"
                    placeholder="Step"
                    class="input input-bordered input-sm md:input-md grow mb-3 md:me-3"
                  />
                  <button
                    class="btn btn-outline btn-error btn-sm md:btn-md"
                    @click="deleteStep(index)"
                  >
                    Delete Step
                  </button>
              </div>
            </template>
            <template v-else-if="step.type === 'textarea'">
              <span class="label label-text font-bold">{{ step.label }}</span>
              <div class="flex flex-col md:flex-row md:items-center">
                  <textarea
                    v-model="step.value"
                    placeholder="Description"
                    class="textarea textarea-bordered textarea-sm md:textarea-md grow mb-3 md:me-3"
                    rows="3"
                  ></textarea>
                  <button
                    class="btn btn-outline btn-error btn-sm md:btn-md"
                    @click="deleteStep(index)"
                  >
                    Delete Step
                  </button>
              </div>
            </template>
            <template v-else-if="step.type === 'file'">
              <span class="label label-text font-bold">{{ step.label }}</span>
              <div class="flex flex-col md:flex-row">
                <input
                  class="file-input file-input-bordered file-input-md w-full grow mb-3 md:me-3"
                  type="file"
                  accept="image/*"
                  @change="handleFileChange(index, $event)"
                />
                  <button
                    class="btn btn-outline btn-error btn-sm md:btn-md mb-3"
                    @click="deleteStep(index)"
                  >
                    Delete Step
                  </button>
              </div>
              <div class="flex flex-col md:flex-row">
                  <button
                    class="btn btn-outline btn-primary btn-sm md:btn-md mb-3 md:me-3 basis-full"
                    @click="handleOpenCamera(index)"
                  >
                    Open Camera
                  </button>
              </div>
                <div class="flex flex-col md:flex-row max-w-lg">
                  <img
                    :src="imageUrl[index]"
                    v-if="imageUrl[index]"
                    alt="Uploaded Image"
                    width="256"
                  />
              </div>
            </template>
          </div>
        </div>
        <div v-else>
          <p>No Steps Added</p>
        </div>
        <div class="divider my-3"></div>
        <div class="flex justify-between">
          <div class="dropdown dropdown-hover dropdown-top">
            <div tabindex="0" role="button" class="btn btn-success">Add Steps</div>
            <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a v-on:mousedown="addStep('text')">Add Step</a></li>
              <li><a v-on:mousedown="addStep('textarea')">Add Description</a></li>
              <li><a v-on:mousedown="addStep('file')">Add Image</a></li>
            </ul>
          </div>
          <button @click="updateRecipe(data.id)" class="btn btn-warning" :disabled="updating">
            <span class="loading loading-spinner loading-xs" v-if="updating"></span>
            Update Recipe
          </button>
        </div>
      </div>
    </div>
    <div v-if="!fetching" class="mt-12 md:invisible">
      <button class="btn btn-circle dark:bg-gray-400 opacity-90" @click="scrollToTop">
        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { useDevicesList, useUserMedia, useWebNotification } from '@vueuse/core'
import { base64ToBlob } from '@/utils/helper'

// Create Broadcast Channel and listen to messages sent to it
const broadcast = new BroadcastChannel('i-recipe-channel')

broadcast.onmessage = (event) => {
  if (event.data && event.data.type === 'CRITICAL_SW_UPDATE') {
    // Show "update to refresh" banner to the user.
    const payload = event.data.payload

    // Log the payload to the console
    console.log(payload)
    //show()
  }
}
const baseUrl = import.meta.env.VITE_API_MOCKAPI + '/recipes'
const data = ref({
  recipe_name: '',
  steps: []
})
const newData = ref(true)

const updating = ref(false)
const fetching = ref(false)
const showToast = ref(false)
const success = ref(false)

const idx = ref(null)

const addStep = async (type) => {
  let label
  if (type === 'text') label = 'Step'
  else if (type === 'textarea') label = 'Description'
  else if (type === 'file') label = 'Image'

  data.value.steps.push({
    type: type,
    value: '',
    label: label
  })
}

const deleteStep = async (id) => {
  data.value.steps.splice(id, 1)

  const response = await fetch(baseUrl + `/${data.value.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.value)
  })

  for (let i = 0; i < imageUrl.value.length; i++) {
    if (imageUrl.value[i] && id < i) {
      imageUrl.value[i - 1] = imageUrl.value[i]
      imageUrl.value[i] = null
    }
  }

  deleteImage(id)

  toast(response.ok)
}

const updateRecipe = async (id) => {
  updating.value = true
  let url = baseUrl
  if (!newData.value) url += `/${id}`

  const response = await fetch(url, {
    method: newData.value ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.value)
  })

  updating.value = false

  toast(response.ok)
  pushNotification(`Successfully Update ${data.value.recipe_name}`)
}

const toast = (status) => {
  success.value = status
  showToast.value = true
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const fetchData = async () => {
  fetching.value = true
  const response = await fetch(baseUrl)
  const rawData = await response.json()

  if (rawData.length > 0) {
    newData.value = false
    data.value = await rawData.map((e) => {
      return {
        ...e,
        id: parseInt(e.id, 10),
        steps: e.steps.filter((sub) => sub instanceof Object)
      }
    })[0]

    getImageFromDB()
  }
  fetching.value = false
}

// image store into IndexedDB usecase
const dbName = 'iRecipeDB'
const tableName = 'recipeImages'
const file = ref([])
const imageUrl = ref([])

const handleFileChange = (index, event) => {
  file.value = event.target.files[0]
  storeAndSetImage(index)
}

const storeAndSetImage = (index) => {
  const reader = new FileReader()

  reader.onload = (e) => {
    imageUrl.value[index] = URL.createObjectURL(file.value)
    saveImageToIndexedDB({
      id: index,
      image: e.target.result
    })
  }

  reader.readAsDataURL(file.value)
}

const saveImageToIndexedDB = (data) => {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
    const db = event.target.result
    const objectStore = db.createObjectStore(tableName, { keyPath: 'id' })
  }

  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction([tableName], 'readwrite')
    const objectStore = transaction.objectStore(tableName)
    const addRequest = objectStore.put(data)

    addRequest.onsuccess = () => {
      console.log('Image added to IndexedDB')
    }

    transaction.oncomplete = () => {
      db.close()
    }
  }
}

const getImageFromDB = () => {
  const request = indexedDB.open(dbName, 1)

  request.onerror = (event) => {
    console.error('Error opening database:', event.target.error)
  };

  request.onsuccess = (event) => {
    const db = event.target.result
    const transaction = db.transaction([tableName], 'readonly')
    const objectStore = transaction.objectStore(tableName)
    const cursor = objectStore.openCursor()

    cursor.onsuccess = (event) => {
      let result = event.target.result
      if (result) {
        imageUrl.value[result.value.id] = result.value.image
        result.continue()
      } else {
        console.log('read success')
      }
    }

    transaction.oncomplete = () => {
        db.close()
    }
  }
}

const deleteImage = (index) => {
  const request = indexedDB.open(dbName, 1)

  request.onerror = (event) => {
    console.error('Error opening database:', event.target.error)
  }

  request.onsuccess = (event) => {
    const db = event.target.result

    const deleteTransaction = db.transaction(tableName, 'readwrite')
    const deleteObjectStore = deleteTransaction.objectStore(tableName)

    const deleteRequest = deleteObjectStore.delete(index)

    deleteRequest.onsuccess = (event) => {
      console.log('Data deleted successfully')
    }

    deleteRequest.onerror = (event) => {
      console.error('Error deleting data', event.target.error)
    }

    deleteTransaction.oncomplete = () => {
      console.log('Delete transaction completed')
      db.close()
      imageUrl.value[index] = null

      for (let i = 0; i < imageUrl.value.length; i++) {
        if (imageUrl.value[i] && id < i) {
          imageUrl.value[i - 1] = imageUrl.value[i]
          imageUrl.value[i] = null
        }
      }
    }
  }
}

// open camera
const currentCamera = ref('')
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find((i) => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  }
})

const video = ref()
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } }
})

const capturedImage = ref('')

const takePicture = () => {
  if (capturedImage.value) {
    capturedImage.value = ''
  } else {
    const canvas = document.createElement('canvas')
    canvas.width = video.value.videoWidth
    canvas.height = video.value.videoHeight

    const context = canvas.getContext('2d')
    context.drawImage(video.value, 0, 0, canvas.width, canvas.height)

    capturedImage.value = canvas.toDataURL('image/png')
  }
}

const choosePicture = async () => {
  file.value = await base64ToBlob(capturedImage.value)
  storeAndSetImage(idx.value)
  showOrHideCamera()
}

const handleOpenCamera = (index) => {
  showOrHideCamera()
  idx.value = index
  cameraModal.showModal()
}

const showOrHideCamera = () => {
  enabled.value = !enabled.value
  capturedImage.value = ''
}

watchEffect(() => {
  if (video.value) video.value.srcObject = stream.value
})

const configurePushNotif = () => {
  const broadcast = new BroadcastChannel('i-recipe-channel')

  broadcast.onmessage = (event) => {
    if (event.data && event.data.type === 'CRITICAL_SW_UPDATE') {
      const payload = event.data.payload
      console.log(payload)
    }
  }
}

const pushNotification = (msg) => {
  const payload = {
    title: 'I-Recipe',
    body: msg,
    dir: 'auto',
    lang: 'en',
    renotify: true,
    tag: 'test',
    vibrate: 1,
    icon: './../../../public/logo.svg'
  }

  const webnotif = useWebNotification(payload)
  if (webnotif.isSupported) {
    webnotif.show()

    webnotif.onClick((evt) => {
      console.log('onclick')
    })
    webnotif.onShow((evt) => {
      console.log('onshow')
    })
    webnotif.onError((evt) => {
      console.log('onerror')
    })
    webnotif.onClose((evt) => {
      console.log('onclose')
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  configurePushNotif()
  fetchData()
})
</script>

<style scoped>
</style>
