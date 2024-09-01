<template>
    <div class="bg-ultify-grey py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-ultify-blue text-center mb-12">{{ carouselData?.title }}</h2>
        <div class="relative">
          <div class="overflow-hidden">
            <div class="flex transition-transform duration-300 ease-in-out" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
              <div v-for="(slide, index) in carouselData?.cards" :key="index" class="w-full flex-shrink-0 px-4">
                <div class="flex space-x-8">
                  <div v-for="image in slide" :key="image.id" class="w-1/2">
                    <a :href="image.link" class="block relative group">
                      <img :src="image.image.url" :alt="`Work sample ${image.image.name}`" class="w-full h-80 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105" />
                      <div class="absolute inset-0 bg-ultify-blue bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <span class="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Case Study</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-16 bg-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-ultify-blue hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-16 bg-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-ultify-blue hover:text-white transition-colors duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onErrorCaptured, watch } from 'vue'
  import { useAsyncData } from '#app'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const carouselData = ref(null)
  const pending = ref(true)
  const error = ref(null)
  const currentSlide = ref(0)

  const fetchCarouselData = async () => {
    try {
      const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
        'carouselData',
        () => $fetch('/api/carousel-data')
      )

      carouselData.value = data.value
      pending.value = fetchPending.value
      if (fetchError.value) {
        throw fetchError.value
      }
    } catch (err) {
      console.error('Error fetching Carousel data:', err)
      error.value = err
    } finally {
      pending.value = false
    }
  }

  // Initial data fetch
  fetchCarouselData()

  // Watch for route changes
  watch(() => route.path, async () => {
    await fetchCarouselData()
  })

  // Add this function to refresh the data
  const refreshCarouselData = async () => {
    await fetchCarouselData()
  }

  // Expose the refresh function to the parent component
  defineExpose({ refreshCarouselData })

  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % (carouselData.value?.cards.length || 1)
  }

  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + (carouselData.value?.cards.length || 1)) % (carouselData.value?.cards.length || 1)
  }

  onErrorCaptured((err) => {
    console.error('Error captured in Carousel.vue:', err)
    error.value = err
    return true
  })
  </script>
  
  <style scoped>
  /* Any additional styles can be added here if needed */
  </style>