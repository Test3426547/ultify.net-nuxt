<template>
    <section class="bg-ultify-grey py-16 relative">
      <div class="container mx-auto px-4 flex flex-col" style="height: calc(100vh - 32rem);">
        <h2 class="text-4xl font-extrabold text-ultify-blue text-center mb-30" style="margin-top: 70px;">{{ carouselData?.title }}</h2>
        <div class="relative flex-grow mt-30 mb-18">
          <div class="overflow-hidden h-full mx-20"> <!-- Added mx-20 for arrow space -->
            <div 
              class="flex h-full transition-transform duration-300 ease-in-out" 
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd"
            >
              <div v-for="(slide, index) in slides" :key="index" class="w-full flex-shrink-0 px-4 flex space-x-8">
                <div v-for="image in slide" :key="image.id" class="w-1/2">
                  <a v-if="image.image && image.image.url" :href="image.link" class="block relative group h-full">
                    <img :src="image.image.url" :alt="image.image.alternativeText || `Work sample ${image.image.name}`" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105" />
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span class="text-white text-lg font-bold bg-ultify-blue bg-opacity-50 px-4 py-2 rounded">View Case Study</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <button @click="prevSlide" class="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-ultify-blue hover:text-white transition-colors duration-300 z-10">
            <i class="bi bi-chevron-left text-2xl"></i>
          </button>
          <button @click="nextSlide" class="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-ultify-blue hover:text-white transition-colors duration-300 z-10">
            <i class="bi bi-chevron-right text-2xl"></i>
          </button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onErrorCaptured, watch, computed } from 'vue'
  import { useAsyncData } from '#app'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const carouselData = ref(null)
  const pending = ref(true)
  const error = ref(null)
  const currentSlide = ref(0)
  const touchStartX = ref(0)
  const touchEndX = ref(0)
  
  const fetchCarouselData = async () => {
    try {
      const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
        'carouselData',
        () => $fetch('/api/carousel-data')
      )
  
      console.log('Fetched Carousel Data:', data.value) // Debugging log
  
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
  
  const slides = computed(() => {
    if (!carouselData.value || !carouselData.value.cards) return []
    const cards = carouselData.value.cards
    const pairedSlides = []
    for (let i = 0; i < cards.length; i += 2) {
      pairedSlides.push(cards.slice(i, i + 2))
    }
    return pairedSlides
  })
  
  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.value.length
  }
  
  const prevSlide = () => {
    currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
  }
  
  const touchStart = (e) => {
    touchStartX.value = e.touches[0].clientX
  }
  
  const touchMove = (e) => {
    touchEndX.value = e.touches[0].clientX
  }
  
  const touchEnd = () => {
    if (touchStartX.value - touchEndX.value > 50) {
      nextSlide()
    } else if (touchEndX.value - touchStartX.value > 50) {
      prevSlide()
    }
  }
  
  onErrorCaptured((err) => {
    console.error('Error captured in Carousel.vue:', err)
    error.value = err
    return true
  })
  </script>
  
  <style scoped>
  .mb-30 {
    margin-bottom: 120px;
  }
  
  .mt-30 {
    margin-top: 120px;
  }
  
  .mb-18 {
    margin-bottom: 70px;
  }
  </style>