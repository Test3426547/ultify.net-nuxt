<template>
  <section class="bg-ultify-grey h-screen flex flex-col">
    <div class="container mx-auto px-4 flex flex-col h-full">
      <h2 class="text-4xl md:text-5xl font-extrabold text-emerald-500 text-center pt-[70px] mb-8">
        {{ carouselData.title }}
      </h2>
      <div class="flex-grow flex flex-col justify-center items-center relative">
        <div class="w-full max-w-4xl relative">
          <div
            ref="carouselContent"
            class="transition-transform duration-300 ease-in-out"
            :style="{ transform: `translateY(-${currentIndex * 50}%)` }"
          >
            <div v-for="(card, index) in carouselData.cards" :key="index" class="w-full mb-8">
              <div class="bg-emerald-500 bg-opacity-10 rounded-3xl overflow-hidden shadow-lg">
                <img :src="card.image.url" :alt="card.image.alternativeText" class="w-full h-64 object-cover" />
                <div class="p-6">
                  <h3 class="text-2xl font-bold text-emerald-500 mb-2">{{ card.title }}</h3>
                  <p class="text-gray-700">{{ card.description }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="absolute right-[-70px] top-1/2 -translate-y-1/2 flex flex-col space-y-4">
            <button
              @click="prevSlide"
              class="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
            <button
              @click="nextSlide"
              class="p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const carouselData = computed(() => state.value.carouselData)

const carouselContent = ref<HTMLElement | null>(null)
const currentIndex = ref(0)

const slideCount = computed(() => carouselData.value?.cards.length || 0)

onMounted(() => {
  if (!carouselData.value) {
    dataStore.fetchCarouselData()
  }
})

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slideCount.value
}

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slideCount.value) % slideCount.value
}

defineExpose({
  nextSlide,
  prevSlide
})
</script>

<style scoped>
/* Add any additional styles here */
</style>