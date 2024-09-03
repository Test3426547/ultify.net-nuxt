<template>
    <section class="bg-ultify-grey min-h-screen pt-[70px] relative overflow-hidden">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl font-bold text-ultify-blue text-center mb-12">{{ carouselData?.title }}</h2>
        <div class="relative">
          <div class="flex transition-transform duration-500 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 50}%)` }">
            <div v-for="(card, index) in carouselData?.cards" :key="index" class="w-1/2 px-4 flex-shrink-0">
              <a :href="card.link" class="block relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
                <img :src="card.image.url" :alt="card.image.alternativeText || card.image.name" class="w-full h-[60vh] object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span class="text-white text-2xl font-bold">{{ carouselData?.text || 'View Case Study' }}</span>
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
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted, onErrorCaptured, watch } from 'vue'
  import { useAsyncData } from '#app'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const carouselData = ref(null)
  const currentSlide = ref(0)
  const totalSlides = ref(0)
  
  const fetchCarouselData = async () => {
    try {
      const { data } = await useAsyncData('carouselData', () => $fetch('/api/carousel-data'))
      carouselData.value = data.value
      totalSlides.value = carouselData.value?.cards?.length || 0
    } catch (err) {
      console.error('Error fetching Carousel data:', err)
    }
  }
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % totalSlides.value
  }
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + totalSlides.value) % totalSlides.value
  }
  
  onMounted(fetchCarouselData)
  
  // Re-fetch data when route changes
  watch(() => route.path, fetchCarouselData)
  
  onErrorCaptured((err) => {
    console.error('Error captured in Carousel.vue:', err)
    return true
  })
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