<template>
  <section class="bg-ultify-grey h-screen flex flex-col">
    <div class="container mx-auto px-4 flex flex-col h-full">
      <h2 class="text-4xl md:text-5xl font-extrabold text-emerald-500 text-center pt-[70px] mb-8">
        {{ carouselData.title }}
      </h2>
      <div class="flex-grow flex justify-center items-center">
        <Carousel orientation="vertical" class="w-full max-w-4xl relative">
          <CarouselContent class="-mt-1 h-[calc(100vh-200px)]">
            <CarouselItem v-for="(card, index) in carouselData.cards" :key="index">
              <Card class="bg-emerald-500 bg-opacity-10 rounded-3xl overflow-hidden shadow-lg">
                <CardContent class="p-6">
                  <img :src="card.image.url" :alt="card.image.alternativeText" class="w-full h-64 object-cover rounded-xl mb-4" />
                  <h3 class="text-2xl font-bold text-emerald-500 mb-2">{{ card.title }}</h3>
                  <p class="text-gray-700">{{ card.description }}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <div class="absolute right-[-70px] top-1/2 -translate-y-1/2 flex flex-col space-y-4">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/dataStore'
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel.vue'
import { Card, CardContent } from '@/components/ui/card.vue'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const carouselData = computed(() => state.value.carouselData)

onMounted(() => {
  if (!carouselData.value) {
    dataStore.fetchCarouselData()
  }
})
</script>

<style scoped>
:deep(.carousel-previous),
:deep(.carousel-next) {
  @apply p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400;
}

:deep(.carousel-previous svg),
:deep(.carousel-next svg) {
  @apply w-6 h-6;
}

:deep(.carousel-previous) {
  transform: rotate(90deg);
}

:deep(.carousel-next) {
  transform: rotate(90deg);
}
</style>