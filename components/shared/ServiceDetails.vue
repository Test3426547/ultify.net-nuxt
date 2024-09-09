<template>
  <section class="bg-ultify-grey py-16 sm:py-24 md:py-32 lg:py-48">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div v-if="state.loading.serviceDetails" class="text-center">
        <p class="text-base sm:text-lg text-ultify-blue">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-base sm:text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="serviceDetailsData">
        <div v-for="(service, index) in serviceDetailsData.ServiceDetails" :key="service.id" 
             class="flex flex-col lg:flex-row items-center justify-between mb-24 md:mb-32 lg:mb-48 last:mb-0">
          <div :class="[
            'w-full lg:w-1/2 mb-8 lg:mb-0',
            index % 2 === 0 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'
          ]">
            <img 
              v-if="service.Image" 
              :src="service.Image.url" 
              :alt="service.Image.alternativeText || service.Heading"
              :srcset="generateSrcSet(service.Image.formats)"
              sizes="(max-width: 768px) 100vw, 50vw"
              class="w-full h-auto rounded-lg shadow-lg"
            >
          </div>
          <div :class="[
            'w-full lg:w-1/2',
            index % 2 === 0 ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'
          ]">
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-500 mb-4 sm:mb-6">{{ service.Heading }}</h2>
            <p class="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">{{ service.Description }}</p>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg text-ultify-blue">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const props = defineProps<{
  serviceId: number
}>()

const { state } = storeToRefs(dataStore)

const serviceDetailsData = computed(() => state.value.serviceDetailsData)

const fetchServiceDetailsData = async (): Promise<void> => {
  await dataStore.fetchServiceDetailsData(props.serviceId)
}

// Initial data fetch
fetchServiceDetailsData()

// Watch for serviceId changes
watch(() => props.serviceId, async (newId: number, oldId: number) => {
  if (newId !== oldId) {
    await fetchServiceDetailsData()
  }
})

// Watch for route changes
watch(() => route.path, fetchServiceDetailsData)

const refreshServiceDetailsData = async (): Promise<void> => {
  await fetchServiceDetailsData()
}

const generateSrcSet = (formats) => {
  if (!formats) return ''
  return Object.entries(formats)
    .map(([size, data]) => `${data.url} ${data.width}w`)
    .join(', ')
}

defineExpose({ refreshServiceDetailsData })
</script>