<template>
  <div>
    <button class="btn btn-outline" onclick="my_modal_5.showModal()">Add Data</button>
  </div>

  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box p-6 bg-white rounded-lg shadow-lg w-screen max-w-screen">

      <!-- CAMERA -->
      <div class="text-center">
        <div v-if="enabled && !capturedImage">
          <video ref="video" muted autoplay controls class="h-100 w-auto" />
        </div>
        <div v-if="capturedImage">
          <img :src="capturedImage" alt="Captured" />
        </div>
        <div v-if="enabled" class="mt-4">
          <button class="btn btn-primary" @click="takePicture" :disabled="!enabled">{{ !capturedImage ? "Take Picture" : "Retake Picture" }}</button>
          <div v-if="capturedImage" class="mt-2">
            <button class="btn btn-success" @click="choosePicture">Choose Picture</button>
          </div>
        </div>
      </div>

      <!-- FORM -->
      <div v-if="!enabled">
        <h3 class="font-bold text-lg mb-4">New Recipe</h3>
        <div>
          <label class="mb-2">Input Recipe Name</label>
          <input
            v-model="recipeName"
            class="input input-bordered input-sm w-full max-w-xs"
            type="text"
            placeholder="Recipe Name"
          />

          <div v-for="(input, index) in inputs" :key="index" class="mt-4">

            <template v-if="input.type === 'text'">
              <label class="mb-2">Step {{ index + 1 }}</label>
              <input
                class="input input-bordered input-sm w-full max-w-xs"
                type="text"
                v-model="input.value"
                :placeholder="input.placeholder"
              />
            </template>

            <template v-else-if="input.type === 'textarea'">
              <label class="mb-2">Description</label>
              <textarea
                class="textarea textarea-bordered textarea-lg w-full max-w-xs"
                v-model="input.value"
                :placeholder="input.placeholder"
              ></textarea>
            </template>
            
            <template v-else-if="input.type === 'file'">
              <label class="mb-2">Add Images</label>
              <input
                class="file-input file-input-bordered file-input-error file-input-sm w-full max-w-xs"
                type="file"
                accept="image/*"
                @change="handleFileChange(index, $event)"
              />
              <button class="btn btn-outline" @click="handleOpenCamera(index)">Open Camera</button>
              <img :src="imageUrl[index]" v-if="imageUrl[index]" alt="Uploaded Image" />
            </template>

            <div class="flex space-x-2 mt-2">
              <button @click="updateInputType(index)" class="btn btn-primary btn-sm">Update</button>
              <button @click="removeInput(index)" class="btn btn-danger btn-sm">Remove</button>
            </div>
            
          </div>

          <div class="mt-4">
            <label class="mb-2">Choose Input Type:</label>
            <select
              v-model="selectedInputType"
              class="select select-bordered select-sm w-full max-w-xs"
            >
              <option value="text">Add Step</option>
              <option value="textarea">Add Description</option>
              <option value="file">Upload Image</option>
            </select>
            <button @click="addInput" class="btn btn-success">Add Input</button>
          </div>
        </div>

        <p class="py-4">Press ESC key or click the button below to close</p>

        <div
          class="modal-action flex xs:items-center xs:place-content-center lg:items-end lg:place-content-end"
        >
          <form
            method="dialog"
            class="flex flex-col xs:place-content-center xs:items-center xs:space-y-2 md:flex-row md:space-x-2"
          >
            <button class="btn btn-outline btn-success xs:w-full" @click="onSubmit">Submit</button>
            <button class="btn btn-neutral xs:w-full">Close</button>
          </form>
        </div>
      </div>
      
    </div>
  </dialog>
</template>


<script setup>

import { reactive, ref, watchEffect } from 'vue'
import { useDevicesList, useUserMedia } from '@vueuse/core'
import { base64ToBlob } from "./../../utils/helper";


const inputs = reactive([])
const selectedInputType = ref('text')
const recipeName = ref('')
const idx = ref(null);

const addInput = () => {
  inputs.push({
    type: selectedInputType.value,
    value: '',
    label: `${
      selectedInputType.value.charAt(0).toUpperCase() + selectedInputType.value.slice(1)
    } Input`,
    placeholder: `Enter ${selectedInputType.value}`
  })
}

const updateInputType = (index) => {
  inputs[index].type = selectedInputType.value
  inputs[index].label = `${
    selectedInputType.value.charAt(0).toUpperCase() + selectedInputType.value.slice(1)
  } Input`
  inputs[index].placeholder = `Enter ${selectedInputType.value}`
}

const removeInput = (index) => {
  inputs.splice(index, 1)
  deleteImg(index)
}

const onSubmit = async () => {
  const url = import.meta.env.VITE_API_MOCKAPI + '/recipes'

  const datas = {
    recipe_name: recipeName.value,
    details: inputs.map((d) => {
      return {
        type: d.type,
        value: d.value
      }
    })
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datas)
  })

  if (response.ok) {
    console.log('Success Add Data')
  } else {
    console.log('Failed Add Data')
  }

}


// image store into IndexedDB usecase
const dbName = "iRecipeDB";
const tableName = "recipeImages";
const file = ref([]);
const imageUrl = ref([]);

const handleFileChange = (index, event) => {
  file.value = event.target.files[0];
  storeAndSetImage(index)
}

const storeAndSetImage = (index) => {
  const reader = new FileReader();

  reader.onload = (e) => {
      imageUrl.value[index] = URL.createObjectURL(file.value);
      saveImageToIndexedDB(index, e.target.result);
  };

  reader.readAsArrayBuffer(file.value);
}

const saveImageToIndexedDB = (index, blob) => {
  const request = indexedDB.open(dbName, 1);

  request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(tableName, { keyPath: "id" });
  };

  request.onsuccess = (event) => {
      const imgToAdd = { id: index, image: blob };

      const db = event.target.result;
      const transaction = db.transaction([tableName], "readwrite");
      const objectStore = transaction.objectStore(tableName);
      const addRequest = objectStore.put(imgToAdd);

      addRequest.onsuccess = () => {
          console.log("Successfully to add Image to IndexedDB");
      };

      transaction.oncomplete = () => {
          db.close();
      };
  };
}

const deleteImg = (index) => {
  const request = indexedDB.open(dbName, 1);

  request.onerror = (event) => {
    console.error("Error opening database:", event.target.error);
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const deleteTransaction = db.transaction(tableName, "readwrite");
    const deleteObjectStore = deleteTransaction.objectStore(tableName);

    const deleteRequest = deleteObjectStore.delete(index);

    deleteRequest.onsuccess = (event) => {
      console.log("Data deleted successfully");
    };

    deleteRequest.onsuccess = (event) => {
      console.log("Data deleted successfully");
    };

    deleteRequest.onerror = (event) => {
      console.error("Error deleting data", event.target.error);
    };

    deleteTransaction.oncomplete = () => {
      console.log("Delete transaction completed");
      db.close();
      imageUrl.value[index] = null
    };
  };
}


// open camera
const currentCamera = ref('')
const { videoInputs: cameras } = useDevicesList({
  requestPermissions: true,
  onUpdated() {
    if (!cameras.value.find(i => i.deviceId === currentCamera.value))
      currentCamera.value = cameras.value[0]?.deviceId
  },
})

const video = ref()
const { stream, enabled } = useUserMedia({
  constraints: { video: { deviceId: currentCamera } },
})

const capturedImage = ref('')

const takePicture = () => {
  if (capturedImage.value) {
    capturedImage.value = ''
  } else {
    const canvas = document.createElement('canvas');
    canvas.width = video.value.videoWidth;
    canvas.height = video.value.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video.value, 0, 0, canvas.width, canvas.height);

    capturedImage.value = canvas.toDataURL('image/png');
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
}

const showOrHideCamera = () => {
  enabled.value = !enabled.value
  capturedImage.value = ''
}

watchEffect(() => {
  if (video.value)
    video.value.srcObject = stream.value
})

</script>
