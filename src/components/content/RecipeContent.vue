<template>
  <div class="flex flex-col items-center justify-center w-full">
    <div v-if="showToast" class="toast toast-top toast-end transition-opacity ease-in-out">
      <div v-if="success" class="alert alert-success">
        <span>Recipe Updated Successfully.</span>
      </div>
      <div v-else class="alert alert-error">
        <span>Failed to Update Recipe.</span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-3 w-3/4">
      <p class="text-lg font-bold">Recipe List</p>
<!--      <AddRecipeModal @add-data="fetchData"/>-->
      <div class="dropdown dropdown-hover">
        <div tabindex="0" role="button" class="btn m-1 btn-success">Add Steps</div>
        <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          <li><a v-on:mousedown="addStep('text')">Add Step</a></li>
          <li><a v-on:mousedown="addStep('textarea')">Add Description</a></li>
          <li><a v-on:mousedown="addStep('file')">Add Image</a></li>
        </ul>
      </div>
    </div>
<!--    <ListRecipe :data="data"-->
<!--                @update-title="(e) => console.log(e)"-->
<!--                @delete-step="(id) => deleteStep(id)"/>-->

    <div class="flex flex-col justify-center items-center w-3/4">
      <div v-if="fetching">
        <span class="loading loading-ring loading-lg"></span>
      </div>
      <div v-else class="p-7 rounded-xl border border-gray-500 w-full">
        <div class="mb-3 font-bold flex items-center">
          <input v-model="data.recipe_name"
                 type="text" placeholder="Recipe Name" class="bg-transparent focus:outline-none grow me-3"
          />
        </div>
        <div v-if="data.steps.length > 0">
          <div v-for="(step, index) in data.steps" :key="index" class="flex flex-col">
            <template v-if="step.type === 'text'">
              <span class="label label-text font-bold">Step {{ index + 1 }}</span>
              <div class="flex flex-col md:flex-row">
                <input v-model="step.value" type="text" placeholder="Step" class="input input-bordered input-sm md:input-md grow mb-3 md:me-3" />
                <button class="btn btn-outline btn-error btn-sm md:btn-md" @click="deleteStep(index)">Delete Step</button>
              </div>
            </template>
            <template v-else-if="step.type === 'textarea'">
              <span class="label label-text font-bold">{{ step.label }}</span>
              <div  class="flex flex-col md:flex-row md:items-center">
                <textarea v-model="step.value" placeholder="Description" class="textarea textarea-bordered textarea-sm md:textarea-md grow mb-3 md:me-3" rows="3"></textarea>
                <button class="btn btn-outline btn-error btn-sm md:btn-md" @click="deleteStep(index)">Delete Step</button>
              </div>
            </template>
            <template v-else-if="step.type === 'file'">
              <span class="label label-text font-bold">{{ step.label }}</span>
              <div class="flex flex-col md:flex-row">
                <input v-model="step.value" type="text" placeholder="Image" class="input input-bordered grow mb-3 md:me-3" />
                <button class="btn btn-outline btn-error btn-sm md:btn-md" @click="deleteStep(index)">Delete Step</button>
              </div>
            </template>
          </div>
        </div>
        <div v-else>
          <p>No Steps Added</p>
        </div>
        <div class="divider my-3"></div>
        <div class="flex justify-end">
          <button @click="updateRecipe(data.id)" class="btn btn-warning" :disabled="updating">
            <span class="loading loading-spinner loading-xs" v-if="updating"></span>
            Update Recipe
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import ListRecipe from './recipe/ListRecipe.vue'
// import EmptyRecipe from './recipe/EmptyRecipe.vue'
import AddRecipeModal from '@/components/modals/addRecipeModal.vue'

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

const addStep = async (type) => {
  let label
  if (type === 'text')
    label = 'Step';
  else if (type === 'textarea')
    label = 'Description';
  else if (type === 'file')
    label = 'Image';

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

  toast(response.ok)
}

const updateRecipe = async (id) => {
  updating.value = true
  let url = baseUrl
  if (!newData.value)
    url += `/${id}`

  const response = await fetch(url, {
    method: newData.value ? 'POST' : 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data.value)
  })

  toast(response.ok)
  updating.value = false
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

  console.log(rawData)
  if (rawData.length > 0) {
    newData.value = false
    data.value = await rawData.map((e) => {
      return {
        ...e,
        id: parseInt(e.id, 10),
        steps: e.steps.filter((sub) => sub instanceof Object),
      }
    })[0]
  }
  fetching.value = false
}

onMounted( () => {
  fetchData()
})
</script>

<style scoped>
/*.recipe-content {*/
/*  */
/*  width: 100%;*/
/*}*/

/*@media (min-width: 768px) {*/
/*  .recipe-content {*/
/*    min-width: 560px;*/
/*  }*/
/*}*/
</style>
