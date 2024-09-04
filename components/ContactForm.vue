<template>
  <Card class="w-full max-w-[620px] bg-ultify-grey shadow-lg rounded-3xl mx-auto mt-8">
    <CardHeader>
      <CardTitle class="text-4xl font-semibold text-center text-gray-800">
        {{ contactFormData?.Title }}
      </CardTitle>
    </CardHeader>
    <CardContent class="px-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div v-for="placeholder in contactFormData?.Placeholder" :key="placeholder.id" class="flex justify-center">
          <div class="w-11/12">
            <Label :for="placeholder.Body.toLowerCase().replace(/\s+/g, '-')" class="text-sm font-medium text-gray-700">
              {{ placeholder.Body }}
            </Label>
            <Input
              :id="placeholder.Body.toLowerCase().replace(/\s+/g, '-')"
              v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
              :placeholder="placeholder.Body"
              :type="getInputType(placeholder.Body)"
              class="mt-1 block w-full rounded-full px-4 py-3 bg-white border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <Button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-11/12 rounded-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg transition-colors duration-300"
          >
            {{ isSubmitting ? 'Submitting...' : contactFormData?.Button }}
          </Button>
        </div>
      </form>
      <p class="mt-6 text-sm text-gray-600 text-center">
        {{ contactFormData?.Description }}
      </p>
      <p v-if="submitSuccess" class="mt-4 text-sm text-emerald-600 text-center font-medium">
        Your enquiry has been submitted successfully!
      </p>
      <p v-if="submitError" class="mt-4 text-sm text-red-600 text-center font-medium">
        {{ submitError }}
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

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