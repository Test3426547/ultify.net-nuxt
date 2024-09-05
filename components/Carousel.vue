<template>
  <section class="bg-ultify-grey min-h-screen flex items-center justify-center">
    <div v-if="state.loading.carousel" class="text-center">
      <p class="text-lg text-emerald-500">Loading...</p>
    </div>
    <div v-else-if="state.error" class="text-center">
      <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
    </div>
    <div v-else-if="carouselData" class="w-full h-screen flex">
      <div class="w-1/2 flex items-center justify-center">
        <Carousel
          :opts="{ align: 'start' }"
          orientation="vertical"
          class="w-full max-w-xl h-[70vh]"
        >
          <CarouselContent class="h-full">
            <CarouselItem v-for="(item, index) in carouselData.cards" :key="index" class="pt-1 h-1/2">
              <div class="p-1 h-full">
                <Card class="h-full">
                  <CardContent class="flex items-center justify-center p-6 h-full">
                    <a :href="item.link" class="w-full h-full">
                      <img :src="item.image.url" :alt="item.image.alternativeText || item.image.name" class="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105" />
                    </a>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>
      <div class="w-1/2 flex flex-col items-center justify-center px-12">
        <h2 class="text-5xl font-bold text-emerald-500 mb-8">{{ carouselData.title }}</h2>
        <p class="text-xl text-black mb-8">{{ carouselData.text }}</p>
        <p class="text-lg font-semibold text-emerald-500">View Our Case Studies</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { useRoute } from 'vue-router'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const carouselData = computed(() => state.value.carouselData)

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