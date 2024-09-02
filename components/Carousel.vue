<template>
    <section class="bg-ultify-grey py-16 relative h-screen flex flex-col">
      <div class="container mx-auto px-4 flex flex-col flex-grow">
        <h2 class="text-4xl font-extrabold text-ultify-blue text-center mb-12">{{ carouselData?.title }}</h2>
        <div class="flex-grow flex flex-col justify-center">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="card in carouselData?.cards" :key="card.id" class="relative group overflow-hidden rounded-lg shadow-lg">
              <img 
                v-if="card.image && card.image.url"
                :src="card.image.url" 
                :alt="card.image.alternativeText || card.image.name" 
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <a 
                  :href="card.link" 
                  class="text-white text-lg font-bold bg-ultify-blue px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors duration-300"
                >
                  {{ carouselData?.text }}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onErrorCaptured, watch } from 'vue'
  import { useAsyncData } from '#app'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const carouselData = ref(null)
  const pending = ref(true)
  const error = ref(null)
  
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

/* Custom class for carousel container */
.carousel-container {
  overflow: hidden;
  background-color: transparent;
  box-shadow: none;
}

/* Remove any potential shadows from child elements */
.carousel-container * {
  box-shadow: none !important;
}

/* Ensure buttons don't have shadows */
button {
  box-shadow: none !important;
}
</style>