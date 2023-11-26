<template>
  <div>
    <button class="btn btn-outline" onclick="my_modal_5.showModal()">Add Data</button>
  </div>

  <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box p-6 bg-white rounded-lg shadow-lg w-screen max-w-screen">
      <h3 class="font-bold text-lg mb-4">New Recipe</h3>
      <div>
        <label class="mb-2">Input Recipe Name</label>
        <input
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
              @change="handleFileChange(index)"
            />
            <button class="btn btn-outline">Take Picture</button>
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
          <button class="btn btn-outline btn-success xs:w-full">Submit</button>
          <button class="btn btn-neutral xs:w-full">Close</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { ref } from 'vue'
const inputs = ref([])
const selectedInputType = ref('text')

const addInput = () => {
  inputs.value.push({
    type: selectedInputType.value,
    value: '',
    label: `${
      selectedInputType.value.charAt(0).toUpperCase() + selectedInputType.value.slice(1)
    } Input`,
    placeholder: `Enter ${selectedInputType.value}`
  })
}

const updateInputType = (index) => {
  inputs.value[index].type = selectedInputType.value
  inputs.value[index].label = `${
    selectedInputType.value.charAt(0).toUpperCase() + selectedInputType.value.slice(1)
  } Input`
  inputs.value[index].placeholder = `Enter ${selectedInputType.value}`
}

const removeInput = (index) => {
  inputs.value.splice(index, 1)
}
</script>
