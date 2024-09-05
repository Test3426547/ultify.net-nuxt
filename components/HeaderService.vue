<template>
  <header class="relative h-screen overflow-hidden">
    <div class="absolute top-0 left-0 right-0 h-1/2 bg-white"></div>
    <div class="absolute bottom-0 left-0 right-0 h-1/2 bg-emerald-500"></div>
    <div class="container mx-auto h-full">
      <div class="flex h-full">
        <div class="w-full lg:w-7/12 flex flex-col py-5 relative">
          <div v-if="state.loading.headerService" class="text-emerald-500">Loading...</div>
          <template v-else-if="headerServiceData">
            <div class="absolute top-1/4 -translate-y-1/2 left-0 right-0 z-10 pl-4 sm:pl-12 lg:pl-36 xl:pl-40">
              <h1 class="text-4xl sm:text-5xl font-bold text-emerald-500 mb-4">
                {{ headerServiceData.Title }}
              </h1>
              <p class="text-lg text-emerald-500">
                {{ headerServiceData.Subtitle }}
              </p>
            </div>
            <div class="absolute top-3/4 -translate-y-1/2 left-0 right-0 z-10 pl-4 sm:pl-12 lg:pl-36 xl:pl-40">
              <h2 class="text-4xl sm:text-5xl font-bold text-white mb-4">
                {{ headerServiceData.Heading }}
              </h2>
              <p class="text-lg text-white mb-6">
                {{ headerServiceData.Subheading }}
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-w-3xl">
                <div v-for="pill in headerServiceData.Pill" :key="pill.id">
                  <span class="inline-block w-full text-center py-2 px-4 rounded-full border border-white text-white text-sm">
                    {{ pill.Title }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="w-full lg:w-5/12 flex justify-center items-center relative">
          <div class="w-full max-w-md">
            <ContactForm @submit="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
    <svg class="absolute bottom-5 left-1/2 -translate-x-1/2 animate-bounce" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 35L36.5 18.5L33.25 15.25L23.5 25V0H16.5V25L6.75 15.25L3.5 18.5L20 35Z" fill="white"/>
    </svg>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()
const dataStore = useDataStore()

const props = defineProps<{
  serviceId: number
}>()

const { state } = storeToRefs(dataStore)

const headerServiceData = computed(() => state.value.headerServiceData)

const fetchHeaderServiceData = async (): Promise<void> => {
  await dataStore.fetchHeaderServiceData(props.serviceId)
}

// Initial data fetch
fetchHeaderServiceData()

// Watch for serviceId changes
watch(() => props.serviceId, async (newId: number, oldId: number) => {
  if (newId !== oldId) {
    await fetchHeaderServiceData()
  }
})

// Watch for route changes
watch(() => route.path, fetchHeaderServiceData)

const refreshHeaderServiceData = async (): Promise<void> => {
  await fetchHeaderServiceData()
}

defineExpose({ refreshHeaderServiceData })

interface FormData {
  // Define the structure of your form data here
  [key: string]: any
}

const handleSubmit = (formData: FormData): void => {
  // Implement form submission logic here
  console.log('Form submitted:', formData)
}
</script>