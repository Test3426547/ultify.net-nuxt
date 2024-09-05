<template>
  <div v-if="contactFormData">
    <Card class="w-full max-w-[580px] bg-ultify-grey shadow-lg mx-auto mt-8 overflow-hidden rounded-[2rem]">
      <CardHeader>
        <CardTitle class="text-3xl font-semibold text-center text-gray-800">
          {{ contactFormData.Title }}
        </CardTitle>
      </CardHeader>
      <CardContent class="p-8 space-y-8">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id">
            <FormItem>
              <FormLabel class="sr-only">{{ placeholder.Body }}</FormLabel>
              <FormControl>
                <Input
                  :id="placeholder.Body.toLowerCase().replace(/\s+/g, '-')"
                  v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
                  :placeholder="placeholder.Body"
                  :type="getInputType(placeholder.Body)"
                  class="w-full rounded-full px-6 py-4 bg-white border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 text-base placeholder-edge h-14"
                />
              </FormControl>
            </FormItem>
          </div>
          <Button 
            type="submit" 
            :disabled="isSubmitting"
            class="w-full rounded-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg transition-colors duration-300 h-14"
          >
            <span v-if="isSubmitting" class="mr-2">
              <Loader2Icon class="h-4 w-4 animate-spin" />
            </span>
            <span class="whitespace-nowrap">{{ isSubmitting ? 'Submitting...' : contactFormData.Button }}</span>
          </Button>
        </form>
        <div class="text-xs text-gray-600 text-center leading-relaxed">
          {{ contactFormData.Description }}
        </div>
      </CardContent>
    </Card>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormItem, FormLabel, FormControl } from '@/components/ui/form'
import { useToast } from '@/components/ui/toast'
import { Loader2Icon } from 'lucide-vue-next'

const route = useRoute()
const dataStore = useDataStore()
const { toast } = useToast()

const { state } = storeToRefs(dataStore)

const contactFormData = computed(() => state.value.contactFormData)

const form = ref({})
const isSubmitting = ref(false)

watch(() => contactFormData.value, (newData) => {
  if (newData && newData.Placeholder) {
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
    toast({
      title: "Success",
      description: "Your enquiry has been submitted successfully!",
      variant: "success",
    })
    form.value = {}
  } catch (error) {
    console.error('Error submitting form:', error)
    toast({
      title: "Error",
      description: `An error occurred while submitting the form: ${error.message}`,
      variant: "destructive",
    })
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
.placeholder-edge::placeholder {
  text-align: left;
  padding-left: 30px;
}

.placeholder-edge {
  padding-left: 36px;
}
</style>