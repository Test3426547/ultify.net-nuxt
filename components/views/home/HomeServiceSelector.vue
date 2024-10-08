<template>
  <section class="bg-ultify-dark-grey min-h-screen flex flex-col justify-center items-center py-8 pb-[38px] px-4 sm:px-6 lg:px-8">
    <div class="container mx-auto flex flex-col h-full">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-4 sm:mb-6">{{ serviceSelectorData?.title }}</h2>
      <p class="text-base sm:text-lg md:text-xl text-white text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        {{ serviceSelectorData?.subtitle }}
      </p>
      <div v-if="state.loading.serviceSelector" class="text-center">
        <p class="text-base sm:text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-base sm:text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="serviceSelectorData && serviceSelectorData.serviceCards" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-[50px]">
        <Card
          v-for="service in serviceSelectorData.serviceCards"
          :key="service.id"
          class="bg-emerald-500 hover:bg-emerald-600 transition-colors duration-300 rounded-3xl overflow-hidden flex flex-col"
        >
          <CardHeader>
            <CardTitle class="text-lg sm:text-xl font-bold text-white">{{ service.heading }}</CardTitle>
          </CardHeader>
          <CardContent class="flex-grow flex flex-col">
            <p class="text-sm sm:text-base text-white mb-4 flex-grow">{{ service.body }}</p>
            <div class="flex justify-center mb-4">
              <img v-if="service.image" :src="service.image.url" :alt="service.image.alternativeText" class="w-12 h-12 sm:w-16 sm:h-16 object-contain" />
            </div>
          </CardContent>
          <CardFooter class="flex justify-end">
            <NuxtLink
              :to="service.link"
              class="text-sm sm:text-base text-white hover:underline transition-all duration-300"
            >
              Learn More
            </NuxtLink>
          </CardFooter>
        </Card>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg text-white">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../../../stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card.vue'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

interface ServiceSelectorData {
  title: string;
  subtitle: string;
  serviceCards: Array<{
    id: number;
    heading: string;
    body: string;
    link: string;
    image: {
      url: string;
      alternativeText: string | null;
    } | null;
  }>;
}

const serviceSelectorData = computed<ServiceSelectorData | null>(() => state.value.serviceSelectorData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.serviceSelector)

// Initial data fetch
dataStore.fetchServiceSelectorData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchServiceSelectorData()
})

const refreshServiceSelectorData = async (): Promise<void> => {
  await dataStore.fetchServiceSelectorData()
}

defineExpose({ refreshServiceSelectorData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshServiceSelectorData()
}
</script>

<style scoped>
@media (max-width: 639px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}
</style>