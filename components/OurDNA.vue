<template>
    <section class="bg-ultify-grey w-full">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div v-if="pending" class="text-center">
          <p class="text-lg text-ultify-blue">Loading...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-red-600">An error occurred while fetching data: {{ error.message }}</p>
        </div>
        <div v-else-if="dnaData" class="flex flex-col md:flex-row items-start justify-between gap-12">
          <div class="w-full md:w-1/2 space-y-6">
            <h2 class="text-4xl md:text-5xl font-bold text-ultify-blue -mt-12">{{ dnaData.title }}</h2>
            <div class="space-y-4 mt-12">
              <template v-for="(paragraph, index) in dnaData.body" :key="paragraph.id">
                <p v-if="index < 2 || dnaData.showMore" class="text-ultify-blue">
                  {{ paragraph.Body }}
                </p>
              </template>
            </div>
            <button 
              v-if="dnaData.body && dnaData.body.length > 2"
              @click="toggleReadMore" 
              class="text-ultify-blue font-semibold flex items-center"
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
        <div v-else class="text-center">
          <p class="text-lg text-ultify-blue">No data available.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useAsyncData } from '#app'
  import { ref, onErrorCaptured, watch } from 'vue'
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  
  const dnaData = ref(null)
  const pending = ref(true)
  const error = ref(null)
  
  const fetchDnaData = async () => {
    try {
      const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
        'ourDnaData',
        () => $fetch('/api/our-dna-data')
      )
  
      dnaData.value = data.value
      pending.value = fetchPending.value
      if (fetchError.value) {
        throw fetchError.value
      }
    } catch (err) {
      console.error('Error fetching DNA data:', err)
      error.value = err
    } finally {
      pending.value = false
    }
  }
  
  // Initial data fetch
  fetchDnaData()
  
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
  
  onErrorCaptured((err) => {
    console.error('Error captured in OurDNA.vue:', err)
    error.value = err
    return true
  })
  </script>