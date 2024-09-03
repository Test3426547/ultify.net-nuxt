<template>
  <section class="bg-ultify-grey min-h-screen pt-[70px] relative overflow-hidden">
    <div class="container mx-auto px-4">
      <div v-if="state.loading.carousel" class="text-center">
        <p class="text-lg text-ultify-blue">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="carouselData">
        <h2 class="text-5xl font-bold text-ultify-blue text-center mb-12">{{ carouselData.title }}</h2>
        <div class="relative">
          <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 50}%)` }">
            <div v-for="(card, index) in carouselData.cards" :key="index" class="w-1/2 px-4 flex-shrink-0">
              <a :href="card.link" class="block relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                <img :src="card.image.url" :alt="card.image.alternativeText || card.image.name" class="w-full h-[60vh] object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span class="text-white text-2xl font-bold">{{ carouselData.text || 'View Case Study' }}</span>
                </div>
              </a>
            </div>
          </div>
          <button @click="prevSlide" class="absolute top-1/2 -translate-y-1/2 -left-6 w-20 h-20 bg-ultify-blue bg-opacity-20 rounded-full flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300 focus:outline-none">
            <svg class="w-10 h-10 text-ultify-blue group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button @click="nextSlide" class="absolute top-1/2 -translate-y-1/2 -right-6 w-20 h-20 bg-ultify-blue bg-opacity-20 rounded-full flex items-center justify-center group hover:bg-opacity-30 transition-all duration-300 focus:outline-none">
            <svg class="w-10 h-10 text-ultify-blue group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
const totalSlides = computed(() => carouselData.value?.cards?.length || 0)

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