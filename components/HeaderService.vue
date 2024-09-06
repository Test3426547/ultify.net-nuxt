<template>
  <header class="relative h-screen overflow-hidden" v-if="headerServiceData">
    <div class="absolute inset-0 bg-white h-1/2"></div>
    <div class="absolute inset-x-0 bottom-0 bg-emerald-500 h-1/2"></div>
    <div class="container mx-auto h-full">
      <div class="flex flex-col lg:flex-row h-full">
        <div class="lg:w-7/12 flex flex-col py-5 relative">
          <div class="absolute top-1/2 -mt-[250px] -left-[120px] right-0 z-10">
            <h1 class="text-4xl lg:text-5xl font-bold text-emerald-500 mb-4">
              {{ headerServiceData.Title }}
            </h1>
            <p class="text-lg text-emerald-500 mt-5">
              {{ headerServiceData.Subtitle }}
            </p>
          </div>
          <div class="absolute top-1/2 mt-[70px] -left-[120px] right-0 z-10">
            <h2 class="text-4xl lg:text-5xl font-bold text-white mb-4">
              {{ headerServiceData.Heading }}
            </h2>
            <p class="text-lg text-white mb-8">
              {{ headerServiceData.Subheading }}
            </p>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
              <div 
                v-for="pill in headerServiceData.Pill" 
                :key="pill.id"
                class="btn btn-outline text-white border-white border-2 hover:bg-white hover:text-emerald-500 transition-all duration-300 text-xs px-3 py-2 rounded-full whitespace-normal font-extrabold transform hover:-translate-y-1 flex items-center justify-center text-center min-h-[60px]"
              >
                {{ pill.Title }}
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-5/12 flex justify-center items-center relative">
          <div class="w-full max-w-md ml-[80px] -mt-[50px] z-10">
            <ContactForm @submit="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
    <svg class="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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

<style scoped>
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-20px);
  }
  60% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 3s infinite;
}
</style>