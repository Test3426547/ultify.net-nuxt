<template>
  <header class="relative min-h-screen overflow-hidden" v-if="headerData">
    <div class="absolute inset-0 bg-white h-1/2"></div>
    <div class="absolute inset-x-0 bottom-0 bg-emerald-500 h-1/2"></div>
    <div class="container mx-auto h-full">
      <div class="flex flex-col lg:flex-row h-full lg:mt-[150px]">
        <div class="w-full lg:w-7/12 flex flex-col py-5 relative">
          <div class="lg:absolute lg:top-1/2 lg:-mt-[300px] lg:-left-[120px] lg:right-0 z-10 px-4 lg:px-0 mt-16">
            <div class="flex flex-col justify-center h-[40vh] lg:h-auto">
              <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-500 mb-4 text-center lg:text-left">
                {{ headerData.Title }}
              </h1>
              <p class="text-base sm:text-lg text-emerald-500 mt-5 text-center lg:text-left">
                {{ headerData.Subtitle }}
              </p>
            </div>
          </div>
          <div class="lg:absolute lg:top-1/2 lg:mt-[20px] lg:-left-[120px] lg:right-0 z-10 px-4 lg:px-0 mt-8">
            <div class="flex flex-col justify-between h-[60vh] lg:h-auto py-8 lg:py-0">
              <div>
                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center lg:text-left">
                  {{ headerData.Heading }}
                </h2>
                <p class="text-base sm:text-lg text-white mb-8 text-center lg:text-left">
                  {{ headerData.Subheading }}
                </p>
              </div>
              <div class="grid grid-cols-2 gap-4 max-w-xs sm:max-w-md mx-auto lg:mx-0">
                <NuxtLink 
                  v-for="link in headerData.Link" 
                  :key="link.id" 
                  :to="link.Link" 
                  class="btn btn-outline text-white border-white border-2 hover:bg-white hover:text-emerald-500 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-3 rounded-full whitespace-nowrap font-extrabold transform hover:-translate-y-1 flex items-center justify-center"
                >
                  {{ link.Text }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        <div class="lg:w-5/12 hidden lg:flex justify-center items-center relative">
          <div class="w-full max-w-md ml-[80px] -mt-[50px] z-10">
            <ContactForm @submit="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
    <svg class="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 35L36.5 18.5L33.25 15.25L23.5 25V0H16.5V25L6.75 15.25L3.5 18.5L20 35Z" fill="white"/>
    </svg>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed } from 'vue'
import ContactForm from '@/components/shared/ContactForm.vue'

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