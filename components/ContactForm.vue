<template>
  <div class="bg-ultify-grey rounded-3xl shadow-lg font-poppins p-6 sm:p-8 md:p-10 w-full max-w-[620px] mx-auto">
    <h2 class="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-4 sm:mb-6 text-ultify-dark-grey leading-tight">
      {{ contactFormData.Title }}
    </h2>
    <form @submit.prevent="handleSubmit" class="space-y-4 sm:space-y-5">
      <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id">
        <input
          class="block w-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-normal leading-6 text-ultify-dark-grey bg-white border border-gray-300 rounded-full transition ease-in-out focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
          v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
          :placeholder="placeholder.Body"
          :type="getInputType(placeholder.Body)"
        />
      </div>
      <button 
        type="submit" 
        class="block w-full py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-bold leading-6 text-white bg-emerald-500 border border-transparent rounded-full transition duration-300 ease-in-out cursor-pointer select-none hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        :disabled="isSubmitting"
      >
        {{ isSubmitting ? 'Submitting...' : contactFormData.Button }}
      </button>
    </form>
    <div class="flex flex-wrap justify-center gap-2 mt-4 sm:mt-6">
      <NuxtLink 
        v-for="link in contactFormData.Link" 
        :key="link.id" 
        :to="link.Link" 
        class="inline-block text-xs sm:text-sm text-ultify-dark-grey border border-ultify-dark-grey rounded-full px-3 py-1 hover:bg-ultify-dark-grey hover:text-white transition-colors duration-300"
      >
        {{ link.Text }}
      </NuxtLink>
    </div>
    <p class="mt-4 sm:mt-6 text-xs sm:text-sm text-ultify-dark-grey text-center leading-relaxed">
      {{ contactFormData.Description }}
    </p>
    <p v-if="submitSuccess" class="mt-2 text-xs sm:text-sm text-emerald-600 text-center">Your enquiry has been submitted successfully!</p>
    <p v-if="submitError" class="mt-2 text-xs sm:text-sm text-red-600 text-center">{{ submitError }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
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

if (!state.value.contactFormData) {
  dataStore.fetchContactFormData()
}

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