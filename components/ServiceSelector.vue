<template>
  <section class="bg-ultify-dark-grey min-h-screen flex flex-col justify-center items-center py-16">
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold text-white text-center mb-6">{{ ourServicesData?.title }}</h2>
      <p class="text-xl text-white text-center max-w-3xl mx-auto mb-16">
        {{ ourServicesData?.subtitle }}
      </p>
      <div v-if="state.loading.ourServices" class="text-center">
        <p class="text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="ourServicesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card
          v-for="service in ourServicesData.serviceCards"
          :key="service.id"
          class="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300"
        >
          <CardHeader>
            <CardTitle class="text-2xl font-bold text-white">{{ service.heading }}</CardTitle>
          </CardHeader>
          <CardContent>
            <p class="text-white mb-4">{{ service.body }}</p>
            <div class="flex justify-center">
              <img v-if="service.image" :src="service.image.url" :alt="service.image.alternativeText" class="w-32 h-32 object-contain" />
            </div>
          </CardContent>
          <CardFooter>
            <NuxtLink
              :to="service.link"
              class="w-full text-center bg-white text-emerald-500 font-bold py-2 px-4 rounded-full hover:bg-gray-100 transition-colors duration-300"
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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

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