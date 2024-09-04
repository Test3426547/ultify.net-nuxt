<template>
    <section class="bg-ultify-grey min-h-screen relative overflow-hidden">
      <div class="container mx-auto px-4 pt-[70px] pb-[70px] flex flex-col justify-center items-center h-full">
        <div v-if="state.loading.carousel" class="text-center">
          <p class="text-lg text-ultify-blue">Loading...</p>
        </div>
        <div v-else-if="state.error" class="text-center">
          <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
        </div>
        <div v-else-if="carouselData" class="flex flex-col items-center w-full mt-[50px]">
          <h2 class="text-5xl font-bold text-ultify-blue text-center mb-[120px]">{{ carouselData.title }}</h2>
          <div class="relative w-full">
            <div class="overflow-hidden">
              <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
                <div v-for="(card, index) in groupedCards" :key="index" class="w-full flex-shrink-0 flex space-x-4">
                  <div v-for="(item, itemIndex) in card" :key="itemIndex" class="w-1/2">
                    <a :href="item.link" class="block relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                      <img :src="item.image.url" :alt="item.image.alternativeText || item.image.name" class="w-full h-[40vh] object-cover" />
                      <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span class="text-white text-2xl font-bold">{{ carouselData.text || 'View Case Study' }}</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <button @click="prevSlide" class="absolute top-1/2 -translate-y-1/2 -left-6 w-12 h-12 bg-ultify-blue bg-opacity-20 rounded-full flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300 focus:outline-none">
              <svg class="w-6 h-6 text-ultify-blue group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <button @click="nextSlide" class="absolute top-1/2 -translate-y-1/2 -right-6 w-12 h-12 bg-ultify-blue bg-opacity-20 rounded-full flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300 focus:outline-none">
              <svg class="w-6 h-6 text-ultify-blue group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, computed } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useDataStore } from '~/stores'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const dataStore = useDataStore()
  
  const { state } = storeToRefs(dataStore)
  
  const carouselData = computed(() => state.value.carouselData)
  
  const currentSlide = ref(0)
  
  const groupedCards = computed(() => {
    if (!carouselData.value?.cards) return []
    const groups = []
    for (let i = 0; i < carouselData.value.cards.length; i += 2) {
      groups.push(carouselData.value.cards.slice(i, i + 2))
    }
    return groups
  })
  
  const totalSlides = computed(() => groupedCards.value.length)
  
  const nextSlide = (): void => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value
  }
  
  const prevSlide = (): void => {
    currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value
  }
  
  // Fetch data only if it doesn't exist
  if (!state.value.carouselData) {
    dataStore.fetchCarouselData()
  }
  
  // Watch for route changes
  watch(() => route.path, () => {
    if (!state.value.carouselData) {
      dataStore.fetchCarouselData()
    }
  })
  
  const refreshCarouselData = async (): Promise<void> => {
    await dataStore.fetchCarouselData()
  }
  
  defineExpose({ refreshCarouselData })
  </script>
  
  <style scoped>
  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .hover\:scale-105:hover {
    animation: bounce 0.5s ease-in-out;
  }
  </style>