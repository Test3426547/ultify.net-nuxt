<template>
  <section class="bg-ultify-grey py-48">
    <div class="container mx-auto px-5 max-w-7xl">
      <div v-if="state.loading.serviceDetails" class="text-center">
        <p class="text-lg text-ultify-blue">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="serviceDetailsData">
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
import { storeToRefs } from 'pinia'
import { useDataStore } from '../../stores/index'
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