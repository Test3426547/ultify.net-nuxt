<template>
  <div class="relative z-10 w-full max-w-[620px] bg-ultify-grey rounded-3xl flex flex-col h-full shadow-lg mx-auto font-poppins" v-if="contactFormData">
    <div class="flex-grow flex flex-col justify-between p-4 sm:p-6 md:p-8">
      <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-6 text-ultify-dark-grey">
        {{ contactFormData.Title }}
      </h2>
      <div class="px-2 sm:px-4">
        <form @submit.prevent="handleSubmit">
          <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id" class="mb-4 sm:mb-5 md:mb-7">
            <input
              class="block w-full py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-normal leading-6 text-ultify-dark-grey bg-white bg-clip-padding border-2 border-gray-300 rounded-full transition ease-in-out m-0 focus:text-ultify-dark-grey focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
              v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
              :placeholder="placeholder.Body"
              :type="getInputType(placeholder.Body)"
            />
          </div>
          <button 
            type="submit" 
            class="block w-full py-3 sm:py-4 md:py-5 px-4 sm:px-6 text-sm sm:text-base font-bold leading-6 text-white bg-emerald-500 border-2 border-transparent rounded-full transition duration-150 ease-in-out cursor-pointer select-none hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-4 sm:mt-5 mb-4 sm:mb-5"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : contactFormData.Button }}
          </button>
        </form>
      </div>
      <p class="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600 text-center">
        {{ contactFormData.Description }}
      </p>
      <p v-if="submitSuccess" class="mt-2 sm:mt-4 text-xs sm:text-sm text-green-600 text-center">Your enquiry has been submitted successfully!</p>
      <p v-if="submitError" class="mt-2 sm:mt-4 text-xs sm:text-sm text-red-600 text-center">{{ submitError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const contactFormData = computed(() => state.value.contactFormData)

const form = ref({})
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

watch(() => contactFormData.value, (newData) => {
  if (newData) {
    form.value = newData.Placeholder.reduce((acc, field) => {
      acc[field.Body.toLowerCase().replace(/\s+/g, '-')] = ''
      return acc
    }, {})
  }
}, { immediate: true })

// Initial data fetch
if (!state.value.contactFormData) {
  dataStore.fetchContactFormData()
}

// Watch for route changes
watch(() => route.path, () => {
  if (!state.value.contactFormData) {
    dataStore.fetchContactFormData()
  }
})

const getInputType = (placeholder: string) => {
  if (placeholder.toLowerCase().includes('email')) return 'email'
  if (placeholder.toLowerCase().includes('phone')) return 'tel'
  return 'text'
}

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
      const errorText = await response.text()
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`)
    }

    const result = await response.json()
    console.log('Form submitted successfully:', result)
    submitSuccess.value = true
    form.value = {}
  } catch (error) {
    console.error('Error submitting form:', error)
    submitError.value = `An error occurred while submitting the form: ${error.message}`
  } finally {
    isSubmitting.value = false
  }
}

const refreshContactFormData = async (): Promise<void> => {
  await dataStore.fetchContactFormData()
}

defineExpose({ refreshContactFormData })
</script>

<style scoped>
@media (max-width: 640px) {
  .bg-ultify-grey {
    border-radius: 1.5rem;
  }

  input::placeholder {
    font-size: 14px;
  }

  input, button {
    font-size: 14px;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .mb-4 {
    margin-bottom: 0.75rem;
  }

  .px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  .p-4 {
    padding: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .bg-ultify-grey {
    border-radius: 2rem;
  }

  input::placeholder {
    font-size: 15px;
  }

  input, button {
    font-size: 15px;
  }

  h2 {
    font-size: 2rem;
  }

  .sm\:p-6 {
    padding: 1.25rem;
  }
}

@media (min-width: 1025px) {
  .bg-ultify-grey {
    margin-left: -55px;
    margin-right: -15px;
  }
}
</style>