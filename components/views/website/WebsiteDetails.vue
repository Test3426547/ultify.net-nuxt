<template>
  <section class="bg-ultify-grey py-16 sm:py-24 md:py-32 lg:py-48" v-if="websiteDetailsData">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <div v-for="(detail, index) in websiteDetailsData.WebsiteDetails" :key="detail.id" 
           class="flex flex-col lg:flex-row items-center justify-between mb-24 md:mb-32 lg:mb-48 last:mb-0">
        <div :class="[
          'w-full lg:w-1/2 mb-8 lg:mb-0',
          index % 2 === 0 ? 'lg:order-2 lg:pl-12' : 'lg:pr-12'
        ]">
          <img 
            v-if="detail.Image && detail.Image.data" 
            :src="detail.Image.data.attributes.url" 
            :alt="detail.Image.data.attributes.alternativeText || detail.Heading"
            :srcset="generateSrcSet(detail.Image.data.attributes.formats)"
            sizes="(max-width: 768px) 100vw, 50vw"
            class="w-full h-auto rounded-lg shadow-lg"
          >
        </div>
        <div :class="[
          'w-full lg:w-1/2',
          index % 2 === 0 ? 'lg:order-1 lg:pr-12' : 'lg:pl-12'
        ]">
          <h2 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-500 mb-4 sm:mb-6">{{ detail.Heading }}</h2>
          <p class="text-gray-700 text-base sm:text-lg lg:text-xl leading-relaxed">{{ detail.Description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed } from 'vue'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const websiteDetailsData = computed(() => state.value.websiteDetailsData)
const error = computed(() => state.value.error)

// Fetch website details data
await dataStore.fetchWebsiteDetailsData()

const generateSrcSet = (formats) => {
  if (!formats) return ''
  return Object.entries(formats)
    .map(([size, data]) => `${data.url} ${data.width}w`)
    .join(', ')
}
</script>
