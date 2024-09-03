<template>
    <section v-cloak class="bg-ultify-dark-grey">
      <div class="bg-ultify-dark-grey py-16">
        <div class="container mx-auto px-4">
          <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">{{ servicesData?.title }}</h2>
          <p class="text-xl text-white text-center max-w-3xl mx-auto">
            {{ servicesData?.subtitle }}
          </p>
        </div>
      </div>
      <div class="container mx-auto px-4 py-16">
        <div v-if="pending" class="text-center">
          <p class="text-lg text-ultify-blue">Loading...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-red-600">An error occurred while fetching data: {{ error.message }}</p>
        </div>
        <div v-else-if="servicesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink
            v-for="service in servicesData.serviceCards"
            :key="service.id"
            :to="service.link"
            class="bg-ultify-blue rounded-lg p-6 text-white transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <h3 class="text-2xl font-bold mb-4">{{ service.heading }}</h3>
            <p class="mb-4">{{ service.body }}</p>
            <div class="flex justify-end">
              <img v-if="service.image" :src="service.image.url" :alt="service.image.alternativeText" class="w-12 h-12 object-contain" />
            </div>
          </NuxtLink>
        </div>
        <div v-else class="text-center">
          <p class="text-lg text-ultify-blue">No data available.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { useAsyncData, useNuxtApp } from '#app'
  import { ref, onErrorCaptured, watch } from 'vue'
  import { useRoute } from 'vue-router'

  const { $cachedFetch } = useNuxtApp()
  
  const route = useRoute()

  interface ServiceCard {
    id: number;
    heading: string;
    body: string;
    link: string;
    image?: {
      url: string;
      alternativeText?: string;
    };
  }

  interface ServicesData {
    title: string;
    subtitle: string;
    serviceCards: ServiceCard[];
  }
  
  const servicesData = ref<ServicesData | null>(null)
  const pending = ref<boolean>(true)
  const error = ref<Error | null>(null)
  
  const fetchServicesData = async (): Promise<void> => {
    try {
      const { data, pending: fetchPending, error: fetchError } = await useAsyncData<ServicesData>(
        'ourServicesData',
        () => $fetch('/api/our-services-data')
      )
  
      servicesData.value = data.value
      pending.value = fetchPending.value
      if (fetchError.value) {
        throw fetchError.value
      }
    } catch (err) {
      console.error('Error fetching Services data:', err)
      error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    } finally {
      pending.value = false
    }
  }
  
  // Initial data fetch
  fetchServicesData()
  
  // Watch for route changes
  watch(() => route.path, async () => {
    await fetchServicesData()
  })
  
  // Add this function to refresh the data
  const refreshServicesData = async (): Promise<void> => {
    await fetchServicesData()
  }
  
  // Expose the refresh function to the parent component
  defineExpose({ refreshServicesData })
  
  console.log('Our Services Data:', servicesData.value)
  
  onErrorCaptured((err: unknown) => {
    console.error('Error captured in OurServices.vue:', err)
    error.value = err instanceof Error ? err : new Error('An unknown error occurred')
    return true
  })

  const { data } = await useAsyncData<unknown>('componentData', () => $cachedFetch('/api/component-data'))
  
  </script>
  
  <style scoped>
  /* Any additional styles can be added here if needed */
  [v-cloak] {
    display: none;
  }
  </style>