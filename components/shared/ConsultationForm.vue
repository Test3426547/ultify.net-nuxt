<template>
  <section v-if="consultationData" class="bg-emerald-500 py-8 sm:py-16 md:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:space-x-8">
        <!-- Image Section -->
        <div class="md:w-1/2 mb-8 md:mb-0">
          <div class="rounded-[2rem] overflow-hidden shadow-lg h-[400px] sm:h-[500px] md:h-[650px]">
            <img :src="consultationData.Image.url" :alt="consultationData.Image.alternativeText" class="w-full h-full object-cover object-top">
          </div>
        </div>

        <!-- Form Section -->
        <div class="md:w-1/2">
          <div class="bg-ultify-grey rounded-[2rem] shadow-lg p-6 sm:p-8 md:p-12 h-auto md:h-[650px]">
            <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-6 md:mb-8 text-center">{{ consultationData.Title }}</h2>
            <div class="mt-4 sm:mt-8 md:mt-[70px]">
              <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-6">
                <div v-for="field in consultationData.Field" :key="field.id" class="relative">
                  <input 
                    :id="field.Body.toLowerCase().replace(/\s+/g, '-')"
                    v-model="form[field.Body.toLowerCase().replace(/\s+/g, '-')]"
                    type="text" 
                    class="w-full pl-4 sm:pl-6 pr-4 sm:pr-6 py-3 sm:py-4 bg-white text-ultify-dark-grey placeholder-ultify-dark-grey rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
                    :placeholder="field.Body"
                  >
                </div>
                <button 
                  type="submit" 
                  class="w-full bg-emerald-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-full hover:bg-emerald-600 transition duration-300 text-sm sm:text-base"
                  :disabled="isSubmitting"
                >
                  {{ isSubmitting ? 'Submitting...' : consultationData.Button }}
                </button>
                <p v-if="submitSuccess" class="text-green-600 text-center text-sm sm:text-base">Your enquiry has been submitted successfully!</p>
                <p v-if="submitError" class="text-red-600 text-center text-sm sm:text-base">{{ submitError }}</p>
              </form>
              <p class="text-xs sm:text-sm text-black mt-4 sm:mt-6 text-center">
                {{ consultationData.Description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div v-else-if="state.error" class="bg-red-100 text-red-700 p-4 text-sm sm:text-base">
    Error loading consultation data: {{ state.error }}
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
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

@media (max-width: 640px) {
  input::placeholder {
    font-size: 14px;
  }
}
</style>