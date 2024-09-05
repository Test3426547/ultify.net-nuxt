<template>
  <div class="md:w-1/2" v-if="contactFormData">
    <div class="bg-ultify-grey rounded-[2rem] shadow-lg p-8 md:p-12" style="height: 650px;">
      <h2 class="text-3xl md:text-4xl font-bold text-black mb-8 text-center">
        {{ contactFormData.Title }}
      </h2>
      <form @submit.prevent="handleSubmit" class="space-y-6 -mt-12">
        <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id" class="relative">
          <input 
            :id="placeholder.Body.toLowerCase().replace(/\s+/g, '-')"
            v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
            :type="getInputType(placeholder.Body)"
            class="w-full pl-6 pr-6 py-4 bg-white text-ultify-dark-grey placeholder-ultify-dark-grey rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
            :placeholder="placeholder.Body"
          >
        </div>
        <button 
          type="submit" 
          class="w-full bg-emerald-500 text-white font-bold py-4 px-6 rounded-full hover:bg-emerald-600 transition duration-300"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Submitting...' : contactFormData.Button }}
        </button>
        <p v-if="submitSuccess" class="text-green-600 text-center">Your enquiry has been submitted successfully!</p>
        <p v-if="submitError" class="text-red-600 text-center">{{ submitError }}</p>
      </form>
      <p class="text-xs text-black mt-12 text-center">
        {{ contactFormData.Description }}
      </p>
    </div>
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

<style module>

</style>