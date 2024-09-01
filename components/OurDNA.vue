<template>
  <section class="container mx-auto px-4 py-16 md:py-24">
    <div v-if="pending" class="text-center">
      <p class="text-lg text-gray-600">Loading...</p>
    </div>
    <div v-else-if="error" class="text-center">
      <p class="text-lg text-red-600">An error occurred while fetching data.</p>
    </div>
    <div v-else-if="dnaData" class="flex flex-col md:flex-row items-center justify-between gap-12">
      <div class="w-full md:w-1/2 space-y-6">
        <h2 class="text-4xl md:text-5xl font-bold text-blue-500">{{ dnaData.title }}</h2>
        <div class="space-y-4">
          <template v-for="(paragraph, index) in dnaData.body" :key="paragraph.id">
            <p v-if="index < 2 || dnaData.showMore" class="text-gray-700">
              {{ paragraph.Body }}
            </p>
          </template>
        </div>
        <button 
          v-if="dnaData.body && dnaData.body.length > 2"
          @click="toggleReadMore" 
          class="text-blue-500 font-semibold flex items-center"
        >
          {{ dnaData.showMore ? dnaData.readMore[1].Body : dnaData.readMore[0].Body }}
          <svg 
            :class="{ 'rotate-180': dnaData.showMore }"
            class="w-4 h-4 ml-2 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>
      <div class="w-full md:w-1/2">
        <img 
          v-if="dnaData.image" 
          :src="dnaData.image.url" 
          :alt="dnaData.image.alternativeText || 'DNA Image'" 
          class="w-full h-auto" 
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAsyncData, useFetch } from '#app'
import { watch, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const dnaData = ref(null)
const pending = ref(true)
const error = ref(null)

const fetchDnaData = async () => {
  const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
    'ourDnaData',
    () => useFetch('/api/our-dna-data')
  )

  dnaData.value = data.value
  pending.value = fetchPending.value
  error.value = fetchError.value
}

// Initial data fetch
await fetchDnaData()

// Watch for route changes
watch(() => route.path, async () => {
  await fetchDnaData()
})

// Add this function to refresh the data
const refreshDnaData = async () => {
  await fetchDnaData()
}

// Expose the refresh function to the parent component
defineExpose({ refreshDnaData })

const toggleReadMore = () => {
  if (dnaData.value) {
    dnaData.value.showMore = !dnaData.value.showMore
  }
}

console.log('Our DNA Data:', dnaData.value)
</script>