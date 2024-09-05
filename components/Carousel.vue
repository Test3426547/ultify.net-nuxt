<template>
  <section class="bg-ultify-dark-grey py-12">
    <div class="container mx-auto px-4">
      <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">{{ ourServicesData?.title }}</h2>
      <p class="text-xl text-white text-center max-w-3xl mx-auto mb-12">
        {{ ourServicesData?.subtitle }}
      </p>
      <div v-if="state.loading.ourServices" class="text-center">
        <p class="text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="ourServicesData" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <HoverCard v-for="service in ourServicesData.serviceCards" :key="service.id">
          <HoverCardTrigger>
            <Card class="bg-emerald-500 text-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
              <CardContent class="p-6 flex flex-col h-full">
                <CardTitle class="text-2xl font-bold text-white mb-4">{{ service.heading }}</CardTitle>
                <p class="mb-4 flex-grow">{{ service.body }}</p>
                <CardFooter class="flex justify-between items-center mt-4 p-0">
                  <Button variant="link" asChild>
                    <NuxtLink :to="service.link" class="text-white hover:underline">Learn More</NuxtLink>
                  </Button>
                  <Avatar>
                    <AvatarImage v-if="service.image" :src="service.image.url" :alt="service.image.alternativeText" />
                    <AvatarFallback>{{ service.heading.charAt(0) }}</AvatarFallback>
                  </Avatar>
                </CardFooter>
              </CardContent>
            </Card>
          </HoverCardTrigger>
          <HoverCardContent class="w-80">
            <h4 class="text-sm font-semibold mb-2">{{ service.heading }}</h4>
            <p class="text-sm">{{ service.body }}</p>
            <Separator class="my-2" />
            <p class="text-sm text-muted-foreground">Click to learn more about our {{ service.heading }} service.</p>
          </HoverCardContent>
        </HoverCard>
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
import { Card, CardContent, CardTitle, CardFooter } from '@/components/ui/card'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

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