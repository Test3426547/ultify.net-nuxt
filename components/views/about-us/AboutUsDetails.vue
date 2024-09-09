<template>
  <div class="bg-ultify-grey py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-500 text-center mb-10 sm:mb-16 md:mb-20">{{ aboutUsData?.title }}</h1>
      <div v-if="state.loading.aboutUsDetails" class="text-center">
        <p class="text-base sm:text-lg text-gray-600">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-base sm:text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="aboutUsData && aboutUsData.aboutUsCards">
        <div v-for="(section, index) in aboutUsData.aboutUsCards" :key="section.id" class="mb-12 sm:mb-16 md:mb-20 last:mb-0">
          <div :class="['flex flex-col lg:flex-row items-center', { 'lg:flex-row-reverse': index % 2 !== 0 }]">
            <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
              <div :class="['max-w-xl mx-auto lg:mx-0', { 'lg:ml-auto': index % 2 !== 0 }]">
                <div class="text-lg sm:text-xl text-gray-600 mb-2 sm:mb-4">{{ section.number }}/</div>
                <div class="inline-block px-4 sm:px-6 py-1 sm:py-2 bg-emerald-500 text-white rounded-full text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
                  {{ section.heading }}
                </div>
                <p class="text-base sm:text-lg text-gray-700 leading-relaxed">{{ section.body }}</p>
              </div>
            </div>
            <div class="w-full lg:w-1/2 mt-8 lg:mt-0">
              <div :class="['max-w-lg mx-auto lg:mx-0', { 'lg:ml-auto': index % 2 === 0 }]">
                <img v-if="section.image" :src="section.image.url" :alt="section.image.alternativeText || 'About Us Image'" class="rounded-3xl shadow-lg w-full h-64 sm:h-80 md:h-96 object-cover">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg text-gray-600">No data available.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

interface AboutUsData {
  title: string;
  aboutUsCards: Array<{
    id: number;
    number: number;
    heading: string;
    body: string;
    image: {
      url: string;
      alternativeText: string | null;
    } | null;
  }>;
}

const aboutUsData = computed<AboutUsData | null>(() => state.value.aboutUsDetailsData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.aboutUsDetails)

// Initial data fetch
dataStore.fetchAboutUsDetailsData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchAboutUsDetailsData()
})

const refreshAboutUsDetailsData = async (): Promise<void> => {
  await dataStore.fetchAboutUsDetailsData()
}

defineExpose({ refreshAboutUsDetailsData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshAboutUsDetailsData()
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .lg\:ml-auto {
    margin-left: auto;
    margin-right: auto;
  }
}
</style>