<template>
  <section class="bg-ultify-grey py-48">
    <div class="container mx-auto px-5 max-w-7xl">
      <div v-if="isLoading" class="text-center">
        <p class="text-lg text-ultify-blue">Loading...</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ error }}</p>
      </div>
      <div v-else-if="serviceDetailsData && serviceDetailsData.ServiceDetails">
        <div v-for="(service, index) in serviceDetailsData.ServiceDetails" :key="service.id" class="flex flex-col lg:flex-row items-center justify-between mb-48 last:mb-0">
          <div :class="[
            'lg:w-[calc(50%-50px)] mb-8 lg:mb-0',
            index % 2 === 0 ? 'lg:-translate-x-16' : 'lg:translate-x-16 lg:order-2'
          ]">
            <h2 class="text-2xl lg:text-3xl font-bold text-emerald-500 mb-5">{{ service.Heading }}</h2>
            <p class="text-[#34495e] text-base lg:text-lg leading-relaxed">{{ service.Description }}</p>
          </div>
          <div :class="[
            'lg:w-[calc(50%-50px)]',
            index % 2 === 0 ? 'lg:translate-x-16' : 'lg:-translate-x-16 lg:order-1'
          ]">
            <img 
              v-if="service.Image" 
              :src="service.Image.url" 
              :alt="service.Image.alternativeText || service.Heading"
              :srcset="generateSrcSet(service.Image.formats)"
              sizes="(max-width: 768px) 100vw, 50vw"
              class="w-full h-auto rounded-lg"
            >
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-ultify-blue">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores/dataStore'

const route = useRoute()
const dataStore = useDataStore()

const props = defineProps<{
  serviceId: number
}>()

const { state } = storeToRefs(dataStore)

const isLoading = computed(() => state.value.loading.headerService) // or serviceDetails for ServiceDetails.vue
const error = computed(() => state.value.error)
const data = computed(() => state.value.headerServiceData) // or serviceDetailsData for ServiceDetails.vue

// Initial data fetch
const fetchData = async () => {
  await dataStore.fetchHeaderServiceData(props.serviceId) // or fetchServiceDetailsData for ServiceDetails.vue
}

fetchData()

// Watch for serviceId changes
watch(() => props.serviceId, async (newId: number, oldId: number) => {
  if (newId !== oldId) {
    await fetchData()
  }
})

// Watch for route changes
watch(() => route.path, fetchData)

const refreshData = async () => {
  await fetchData()
}

defineExpose({ refreshData })

const generateSrcSet = (formats) => {
  if (!formats) return ''
  return Object.entries(formats)
    .map(([size, data]) => `${data.url} ${data.width}w`)
    .join(', ')
}

</script>