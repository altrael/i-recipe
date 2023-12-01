<template>
  <div class="flex flex-col justify-center items-center w-3/4">
    <div class="p-7 rounded-xl border border-gray-500 w-full">
      <div class="mb-3 font-bold flex items-center">
        <input
          v-model="title"
          type="text"
          placeholder="Recipe Name"
          class="bg-transparent focus:outline-none grow me-3"
        />
        <button @input="$emit('updateTitle', title)" class="btn btn-warning btn-sm">
          Update Title
        </button>
      </div>
      <div v-if="data && data.steps">
        <div v-for="(step, index) in data.steps" :key="index" class="flex flex-col mb-3">
          <span class="label label-text font-bold">Step {{ index + 1 }}</span>
          <template v-if="step.type === 'text'">
            <div class="flex flex-col md:flex-row">
              <input
                type="text"
                placeholder="Step"
                class="input input-bordered input-sm md:input-md grow mb-3 md:me-3"
              />
              <button
                class="btn btn-outline btn-error btn-sm md:btn-md"
                @click="$emit('deleteStep', index)"
              >
                Delete Step
              </button>
            </div>
          </template>
          <div
            v-else-if="step.type === 'textarea'"
            class="flex flex-col md:flex-row md:items-center"
          >
            <textarea
              placeholder="Description"
              class="textarea textarea-bordered textarea-sm md:textarea-md grow mb-3 md:me-3"
              rows="3"
            ></textarea>
            <button
              class="btn btn-outline btn-error btn-sm md:btn-md"
              @click="$emit('deleteStep', index)"
            >
              Delete Step
            </button>
          </div>
          <div v-else-if="step.type === 'file'" class="flex flex-col md:flex-row">
            <input type="text" placeholder="Image" class="input input-bordered grow me-3" />
            <button
              class="btn btn-outline btn-error btn-sm md:btn-md"
              @click="$emit('deleteStep', index)"
            >
              Delete Step
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No Steps Added</p>
      </div>
      <div class="divider my-3"></div>
      <div class="flex justify-end">
        <div class="dropdown dropdown-hover dropdown-left dropdown-end">
          <div tabindex="0" role="button" class="btn m-1 btn-success">Add</div>
          <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a v-on:mousedown="$emit('addStep', 'text')">Add Step</a></li>
            <li><a v-on:mousedown="$emit('addStep', 'textarea')">Add Description</a></li>
            <li><a v-on:mousedown="$emit('addStep', 'file')">Add Image</a></li>
          </ul>
        </div>
      </div>
    </div>
    <!--    <div v-for="d in data" :key="d.id" class="p-7 rounded-xl border border-gray-500 w-full">-->
    <!--      <h2 class="mb-3 font-bold">{{ d.recipe_name }}</h2>-->
    <!--      <div v-for="(step, j) in d.details" :key="step.value" class="mb-3 w-full">-->
    <!--        <div v-if="step.type === 'text'" class="form-control">-->
    <!--          <span class="label label-text">Step {{ j + 1 }}</span>-->
    <!--          <input :disabled="d.disabled" :value="step.value" type="text" placeholder="Step" class="input input-bordered" />-->
    <!--        </div>-->
    <!--        <div v-else-if="step.type === 'textarea'" class="form-control">-->
    <!--          <span class="label label-text">Step {{ j + 1 }}</span>-->
    <!--          <textarea :disabled="d.disabled" :value="step.value" placeholder="Description" class="textarea textarea-bordered" ></textarea>-->
    <!--        </div>-->
    <!--        <div v-else-if="step.type === 'file'" class="form-control">-->
    <!--          <span class="label label-text">Step {{ j + 1 }}</span>-->
    <!--          <input :disabled="d.disabled" :value="step.value" type="text" placeholder="Image" class="input input-bordered" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="divider"></div>-->
    <!--      <div class="flex justify-end flex-col md:flex-row mt-5">-->
    <!--        <button @click="deleteRecipe(d.id)" v-if="!edit" class="btn btn-error btn-outline btn-sm md:btn-md mb-3 md:me-3">Delete Recipe</button>-->
    <!--        <button @click="cancel(d.id - 1)" v-else class="btn btn-error btn-outline btn-sm md:btn-md mb-3 md:me-3">Cancel</button>-->
    <!--        <button @click="updateRecipe(d.id - 1)" class="btn btn-warning btn-sm md:btn-md">Update Recipe</button>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, onBeforeUpdate } from 'vue'

defineProps({
  data: Object
})

const updatedData = ref({})

const emit = defineEmits(['updateTitle', 'deleteStep', 'addStep'])

const edit = ref(false)
const title = ref('')

const updateRecipe = (id) => {
  // console.log(id)
  // console.log(data.value)
  if (edit.value) {
    console.log('put to server')
    console.log(data.value)
  } else {
    edit.value = true
    data.value[id].disabled = false
  }
}

const cancel = (id) => {
  edit.value = false
  data.value[id].disabled = true
}

onMounted(() => {
  console.log('mounted')
  // console.log(rawData)
  // data.value = {...rawData}
  // console.log(data.value)
})
// onBeforeUpdate(() => {
//   console.log('update')
//   console.log(rawData)
//   data.value = {...rawData}
//   console.log(data.value)
// })
</script>
