<template>
  <section v-if="consultationData" class="bg-emerald-500 py-16 md:py-32">
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
          <Card class="bg-ultify-grey rounded-[2rem] shadow-lg p-8 md:p-12" style="height: 650px;">
            <h2 class="text-3xl md:text-4xl font-bold text-black mb-8 text-center">{{ consultationData.Title }}</h2>
            <ScrollArea class="h-[450px] pr-4">
              <form @submit.prevent="handleSubmit" class="space-y-6">
                <CollapsiblePills
                  v-model="form"
                  :fields="consultationData.Field.map(field => ({
                    id: field.id,
                    key: field.Body.toLowerCase().replace(/\s+/g, '-'),
                    placeholder: field.Body
                  }))"
                />

                <Select v-model="form.service">
                  <SelectTrigger class="w-full pl-6 pr-4 py-4 bg-white text-black rounded-full">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="seo">SEO</SelectItem>
                    <SelectItem value="paid-media">Paid Media</SelectItem>
                    <SelectItem value="content-creation">Content Creation</SelectItem>
                    <SelectItem value="print-advertising">Print Advertising</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea 
                  v-model="form.message"
                  placeholder="Your message"
                  class="w-full pl-6 pr-4 py-4 bg-white text-black placeholder-ultify-grey rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

                <div class="flex items-center space-x-2">
                  <Checkbox id="marketing" v-model="form.marketing" />
                  <Label for="marketing" class="text-black">Receive Marketing Material</Label>
                </div>
              </form>
            </ScrollArea>

            <Button 
              @click="handleSubmit"
              class="w-full bg-emerald-500 text-white font-bold py-4 px-6 rounded-full hover:bg-emerald-600 transition duration-300 mt-6"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? 'Submitting...' : consultationData.Button }}
            </Button>

            <p class="text-xs text-black mt-4 text-center">
              {{ consultationData.Description }}
            </p>
          </Card>
        </div>
      </div>
    </div>
  </section>
  <div v-else-if="state.error" class="bg-red-100 text-red-700 p-4">
    Error loading consultation data: {{ state.error }}
  </div>

  <Toast />
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import CollapsiblePills from '@/components/ui/CollapsiblePills.vue'

const route = useRoute()
const dataStore = useDataStore()
const toast = useToast()

const { state } = storeToRefs(dataStore)

const consultationData = computed(() => state.value.consultationData)

const form = ref({
  'url-business-name': '',
  service: '',
  message: '',
  marketing: true,
})

const isSubmitting = ref(false)

watch(() => consultationData.value, (newData) => {
  if (newData) {
    newData.Field.forEach(field => {
      form.value[field.Body.toLowerCase().replace(/\s+/g, '-')] = ''
    })
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
    toast.success({
      title: 'Success',
      description: 'Enquiry has been sent to our team',
    })
    form.value = { 'url-business-name': '', service: '', message: '', marketing: true }
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error({
      title: 'Error',
      description: 'There was an error please try again',
      action: {
        label: 'Try Again',
        onClick: () => handleSubmit(),
      },
    })
  } finally {
    isSubmitting.value = false
  }
}

const refreshConsultationData = async (): Promise<void> => {
  await dataStore.fetchConsultationData()
}

defineExpose({ refreshConsultationData })
</script>