<template>
  <div v-if="qneData" class="bg-emerald-500 min-h-screen flex items-center justify-center p-8">
    <div class="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between">
      <div class="text-white max-w-2xl mb-8 lg:mb-0 lg:mr-8 lg:-ml-[50px]">
        <h1 class="!text-4xl md:!text-5xl !font-bold !mb-[70px] text-ultify-white whitespace-nowrap">{{ qneData.Title }}</h1>
        <ul class="space-y-6 mb-8">
          <li v-for="(item, index) in qneData.Body" :key="index" class="flex items-start">
            <Badge variant="outline" class="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center mr-4 mt-1">
              <span class="text-lg font-bold">{{ index + 1 }}</span>
            </Badge>
            <p class="text-lg">{{ item.Body }}</p>
          </li>
        </ul>
        <div class="-mt-[62px]">
          <Button 
            :to="qneData.Link" 
            variant="secondary"
            class="bg-white text-emerald-500 font-bold py-4 px-8 rounded-full text-lg inline-block transition-all duration-300 hover:bg-opacity-90 hover:animate-bounce"
          >
            {{ qneData.Text }}
          </Button>
        </div>
      </div>
      <div class="relative w-full max-w-md lg:max-w-xl lg:ml-[100px]">
        <AspectRatio :ratio="16 / 9">
          <img :src="qneData.Image" :alt="qneData.Title" class="w-full h-full object-cover rounded-lg" />
        </AspectRatio>
      </div>
    </div>
  </div>
  <div v-else-if="state.loading.qne" class="text-center p-8">
    <Skeleton class="w-64 h-8 mx-auto mb-4" />
    <Skeleton class="w-48 h-6 mx-auto" />
  </div>
  <div v-else-if="error" class="text-center p-8">
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        An error occurred while fetching data: {{ error }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const qneData = computed(() => state.value.qneData)
const error = computed(() => state.value.error)

// Initial data fetch
dataStore.fetchQNEData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchQNEData()
})

const refreshQNEData = async (): Promise<void> => {
  await dataStore.fetchQNEData()
}

defineExpose({ refreshQNEData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshQNEData()
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hover\:animate-bounce:hover {
  animation: bounce 0.5s ease-in-out;
}
</style>