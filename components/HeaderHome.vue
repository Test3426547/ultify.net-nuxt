<template>
  <header class="relative h-screen overflow-hidden" v-if="headerData">
    <div class="absolute inset-0 bg-ultify-grey h-1/2"></div>
    <div class="absolute inset-0 top-1/2 bg-emerald-500"></div>
    <div class="container mx-auto h-full">
      <div class="flex h-full">
        <div class="w-full lg:w-7/12 flex flex-col py-5 relative">
          <div class="absolute top-1/4 -mt-24 left-12 z-10">
            <h1 class="text-5xl font-bold text-emerald-500 mb-4">
              {{ headerData.Title }}
            </h1>
            <p class="text-xl text-emerald-500">
              {{ headerData.Subtitle }}
            </p>
          </div>
          <div class="absolute top-1/2 mt-16 left-12 z-10">
            <h2 class="text-5xl font-bold text-white mb-4">
              {{ headerData.Heading }}
            </h2>
            <p class="text-xl text-white mb-8">
              {{ headerData.Subheading }}
            </p>
            <div class="grid grid-cols-2 gap-4 max-w-2xl">
              <NuxtLink 
                v-for="link in headerData.Link" 
                :key="link.id" 
                :to="link.Link" 
                class="pill-button"
              >
                {{ link.Text }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-5/12 flex justify-center items-center relative">
          <ContactForm @submit="handleSubmit" />
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
import { useDataStore } from '~/stores'
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
.pill-button {
  @apply bg-transparent border-2 border-white text-white rounded-full py-3 px-6 font-extrabold text-lg transition-all duration-300 hover:bg-white hover:text-emerald-500;
}
</style>