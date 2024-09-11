<template>
  <header class="relative min-h-screen overflow-hidden" v-if="headerData">
    <div class="absolute inset-0 bg-white h-1/3 sm:h-1/2 xl:h-1/2"></div>
    <div class="absolute inset-x-0 bottom-0 bg-emerald-500 h-2/3 sm:h-1/2 xl:h-1/2"></div>
    <div class="container mx-auto h-full px-4 sm:px-6 xl:px-8 flex flex-col xl:flex-row items-center justify-between">
      <div class="w-full xl:w-7/12 flex flex-col py-5 relative">
        <div class="xl:absolute xl:top-1/4 z-10 mb-8 xl:mb-0 flex flex-col justify-center items-center xl:items-start h-[30vh] sm:h-[40vh] xl:h-auto">
          <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-emerald-500 mb-4 text-center xl:text-left">
            {{ headerData.Title }}
          </h1>
          <p class="text-base sm:text-lg text-emerald-500 mt-5 text-center xl:text-left">
            {{ headerData.Subtitle }}
          </p>
        </div>
        <div class="xl:absolute xl:top-2/3 z-10 mt-8 xl:mt-0 flex flex-col justify-center items-center xl:items-start h-[50vh] sm:h-[60vh] xl:h-auto">
          <h2 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-white mb-4 text-center xl:text-left">
            {{ headerData.Heading }}
          </h2>
          <p class="text-base sm:text-lg text-white mb-8 text-center xl:text-left">
            {{ headerData.Subheading }}
          </p>
          <div class="grid grid-cols-3 xl:grid-cols-3 gap-4 max-w-3xl w-full xl:w-auto mb-12 xl:mb-0">
            <NuxtLink 
              v-for="link in headerData.Link" 
              :key="link.id" 
              :to="link.Link" 
              class="btn btn-outline text-white border-white border-2 hover:bg-white hover:text-emerald-500 transition-all duration-300 text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-3 rounded-full whitespace-nowrap font-extrabold transform hover:-translate-y-1 flex items-center justify-center"
            >
              {{ link.Text }}
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="w-full xl:w-5/12 justify-center items-center relative mt-8 xl:mt-0 hidden xl:flex">
        <div class="w-full max-w-md xl:ml-[80px] z-10">
          <ContactForm @submit="handleSubmit" />
        </div>
      </div>
    </div>
    <svg class="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce hidden xl:block" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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

@media (max-width: 1279px) {
  .container {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>