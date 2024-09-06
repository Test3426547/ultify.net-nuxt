<template>
  <header class="relative h-screen bg-gradient-to-b from-white to-emerald-500 overflow-hidden" v-if="headerData">
    <div class="container mx-auto h-full px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row h-full items-center">
        <div class="lg:w-7/12 flex flex-col justify-center py-12 lg:py-0">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold text-emerald-500 leading-tight mb-4">
            {{ headerData.Title }}
          </h1>
          <p class="text-xl sm:text-2xl text-emerald-400 mb-12">
            {{ headerData.Subtitle }}
          </p>
          <div class="bg-emerald-500 text-white p-8 rounded-lg">
            <h2 class="text-3xl sm:text-4xl font-bold mb-4">
              {{ headerData.Heading }}
            </h2>
            <p class="text-lg mb-6">
              {{ headerData.Subheading }}
            </p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <NuxtLink 
                v-for="link in headerData.Link" 
                :key="link.id" 
                :to="link.Link" 
                class="btn btn-outline text-white border border-white hover:bg-white hover:text-emerald-500 transition-colors duration-300 text-sm px-4 py-2 rounded-full text-center"
              >
                {{ link.Text }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="lg:w-5/12 mt-12 lg:mt-0">
          <div class="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">Book A Free Consultation Now</h3>
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
import { computed } from 'vue'
import ContactForm from '@/components/ContactForm.vue'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const headerData = computed(() => state.value.headerData)
const error = computed(() => state.value.error)

// Fetch header data
await dataStore.fetchHeaderData()

interface FormData {
  // Define the structure of your form data here
  [key: string]: any;
}

const handleSubmit = (formData: FormData): void => {
  // Implement form submission logic here
  console.log('Form submitted:', formData);
};
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