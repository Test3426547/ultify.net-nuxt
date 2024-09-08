<template>
  <div class="min-h-screen bg-ultify-dark-grey py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
    <div v-if="state.loading.serviceTechnologyRight" class="text-center">
      <p class="text-lg text-white">Loading...</p>
    </div>
    <div v-else-if="state.error" class="text-center">
      <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
    </div>
    <div v-else-if="serviceTechnologyRightData" class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
      <!-- Left side - CMS details -->
      <div class="lg:w-1/2 mt-8 lg:mt-0 relative" style="top: -50px;">
        <transition name="fade">
          <div v-if="selectedCMS" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img :src="selectedCMS.image.url" :alt="selectedCMS.image.alternativeText" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">{{ selectedCMS.subheading }}</h3>
              <p class="text-white mb-6">{{ selectedCMS.body }}</p>
              <div class="flex">
                <ul class="space-y-2 w-1/2 pr-2">
                  <li v-for="(point, index) in selectedCMS.points.slice(0, 3)" :key="point.id" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point.body }}</span>
                  </li>
                </ul>
                <ul class="space-y-2 w-1/2 pl-2">
                  <li v-for="(point, index) in selectedCMS.points.slice(3, 6)" :key="point.id" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point.body }}</span>
                  </li>
                </ul>
              </div>
              <div class="mt-6 flex items-center text-white cursor-pointer group">
                <span class="text-lg font-semibold">{{ serviceTechnologyRightData.subheading }}</span>
                <ArrowRightIcon class="w-6 h-6 ml-2 group-hover:animate-bounce-horizontal" />
              </div>
            </div>
          </div>
          <div v-else class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img :src="serviceTechnologyRightData.image.url" :alt="serviceTechnologyRightData.image.alternativeText" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">{{ serviceTechnologyRightData.heading }}</h3>
              <p class="text-white mb-6">{{ serviceTechnologyRightData.body }}</p>
              <div class="mt-6 flex items-center text-white cursor-pointer group">
                <span class="text-lg font-semibold">{{ serviceTechnologyRightData.subheading }}</span>
                <ArrowRightIcon class="w-6 h-6 ml-2 group-hover:animate-bounce-horizontal" />
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Right side - CMS options -->
      <div class="lg:w-1/2 lg:pl-8 relative" style="top: -80px;">
        <h1 class="text-4xl font-bold text-white mb-16 text-right" style="margin-top: 100px;">{{ serviceTechnologyRightData.title }}</h1>
        <h2 class="text-3xl font-semibold text-white mb-8 text-right" style="margin-top: 70px;">{{ serviceTechnologyRightData.subtitle }}</h2>
        <ul class="text-right space-y-8">
          <li v-for="option in serviceTechnologyRightData.options" :key="option.id" 
              class="block">
            <span 
              class="px-6 py-2 text-4xl font-bold text-white border-2 border-white rounded-full cursor-pointer transition-all duration-300 inline-block hover:animate-bounce-vertical"
              @mouseover="selectedCMS = option"
              @mouseleave="selectedCMS = null"
            >
              {{ option.heading }}
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-lg text-white">No data available.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const serviceTechnologyRightData = computed(() => state.value.serviceTechnologyRightData)
const selectedCMS = ref(null)

// Initial data fetch
await dataStore.fetchServiceTechnologyRightData()

// Watch for route changes
watch(() => route.path, async () => {
  await dataStore.fetchServiceTechnologyRightData()
})

const refreshServiceTechnologyRightData = async (): Promise<void> => {
  await dataStore.fetchServiceTechnologyRightData()
}

defineExpose({ refreshServiceTechnologyRightData })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

@keyframes bounce-horizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 1s infinite;
}

@keyframes bounce-vertical {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hover\:animate-bounce-vertical:hover {
  animation: bounce-vertical 0.5s ease-in-out;
}
</style>