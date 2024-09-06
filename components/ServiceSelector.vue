<template>
  <section class="bg-ultify-dark-grey min-h-screen flex flex-col justify-center items-center py-8 pb-[38px]">
    <div class="container mx-auto px-4 flex flex-col h-full">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">{{ ourServicesData?.title }}</h2>
      <p class="text-lg md:text-xl text-white text-center max-w-3xl mx-auto mb-8">
        {{ ourServicesData?.subtitle }}
      </p>
      <div v-if="state.loading.ourServices" class="text-center">
        <p class="text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="ourServicesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[50px]">
        <Card
          v-for="service in ourServicesData.serviceCards"
          :key="service.id"
          class="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 rounded-3xl overflow-hidden flex flex-col"
        >
          <CardHeader>
            <CardTitle class="text-xl font-bold text-white">{{ service.heading }}</CardTitle>
          </CardHeader>
          <CardContent class="flex-grow flex flex-col">
            <p class="text-white mb-4 flex-grow">{{ service.body }}</p>
            <div class="flex justify-center mb-4">
              <img v-if="service.image" :src="service.image.url" :alt="service.image.alternativeText" class="w-16 h-16 object-contain" />
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <NuxtLink
              :to="service.link"
              class="text-white hover:underline transition-all duration-300"
            >
              Learn More
            </NuxtLink>
          </CardFooter>
        </Card>
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-white">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card.vue'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const ourServicesData = computed(() => state.value.ourServicesData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.ourServices)

// Initial data fetch
dataStore.fetchOurServicesData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchOurServicesData()
})

const refreshServicesData = async (): Promise<void> => {
  await dataStore.fetchOurServicesData()
}

defineExpose({ refreshServicesData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshServicesData()
}
</script>