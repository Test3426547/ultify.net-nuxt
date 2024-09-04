<template>
  <section v-if="consultationData" class="bg-ultify-blue py-16 md:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:space-x-8">
        <!-- Image Section -->
        <div class="md:w-1/2 mb-8 md:mb-0">
          <div class="rounded-[2rem] overflow-hidden shadow-lg" style="height: 650px;">
            <img :src="consultationData.Image.url" :alt="consultationData.Image.alternativeText" class="w-full h-full object-cover object-top">
          </div>
        </div>

        <!-- Form Section -->
        <div class="md:w-1/2">
          <div class="bg-ultify-grey rounded-[2rem] shadow-lg p-8 md:p-12" style="height: 650px;">
            <h2 class="text-3xl md:text-4xl font-bold text-black mb-8 text-center">{{ consultationData.Title }}</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6 -mt-12">
              <div v-for="field in consultationData.Field" :key="field.id" class="relative">
                <input 
                  :id="field.Body.toLowerCase().replace(/\s+/g, '-')"
                  v-model="form[field.Body.toLowerCase().replace(/\s+/g, '-')]"
                  type="text" 
                  class="w-full pl-4 pr-4 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
                  :placeholder="field.Body"
                >
              </div>
              <button 
                type="submit" 
                class="w-full bg-ultify-blue text-white font-bold py-3 px-6 rounded-full hover:bg-ultify-blue-dark transition duration-300"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Submitting...' : consultationData.Button }}
              </button>
              <p v-if="submitSuccess" class="text-green-600 text-center">Your enquiry has been submitted successfully!</p>
              <p v-if="submitError" class="text-red-600 text-center">{{ submitError }}</p>
            </form>
            <p class="text-xs text-black mt-12 text-center">
              {{ consultationData.Description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else-if="state.error" class="bg-red-100 text-red-700 p-4">
    Error loading consultation data: {{ state.error }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const consultationData = computed(() => state.value.consultationData)

const form = ref({})
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

watch(() => consultationData.value, (newData) => {
  if (newData) {
    form.value = newData.Field.reduce((acc, field) => {
      acc[field.Body.toLowerCase().replace(/\s+/g, '-')] = ''
      return acc
    }, {})
  }
}, { immediate: true })

// Initial data fetch
if (!state.value.consultationData) {
  dataStore.fetchConsultationData()
}

// Watch for route changes
watch(() => route.path, () => {
  if (!state.value.consultationData) {
    dataStore.fetchConsultationData()
  }
})

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    const response = await fetch('/api/submit-enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: form.value }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Form submitted successfully:', result)
    submitSuccess.value = true
    form.value = {}
  } catch (error) {
    console.error('Error submitting form:', error)
    submitError.value = 'An error occurred while submitting the form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const refreshConsultationData = async (): Promise<void> => {
  await dataStore.fetchConsultationData()
}

defineExpose({ refreshConsultationData })
</script>

<style scoped>
input::placeholder {
  text-align: left;
}
</style>