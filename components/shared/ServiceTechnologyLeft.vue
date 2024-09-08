<template>
  <div class="min-h-screen bg-emerald-500 py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
    <div v-if="state.loading.serviceTechnologyLeft" class="text-center">
      <p class="text-lg text-white">Loading...</p>
    </div>
    <div v-else-if="state.error" class="text-center">
      <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
    </div>
    <div v-else-if="serviceTechnologyLeftData" class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
      <!-- Left side - Framework options -->
      <div class="lg:w-1/2 lg:pr-8 relative" style="top: -80px;">
        <h1 class="text-4xl font-bold text-white mb-16 text-left" style="margin-top: 100px;">{{ serviceTechnologyLeftData.title }}</h1>
        <h2 class="text-3xl font-semibold text-white mb-8" style="margin-top: 70px;">{{ serviceTechnologyLeftData.subtitle }}</h2>
        <ul class="space-y-8">
          <li v-for="option in serviceTechnologyLeftData.options" :key="option.id" 
              class="block">
            <span 
              class="px-6 py-2 text-4xl font-bold text-white border-2 border-white rounded-full cursor-pointer transition-all duration-300 inline-block hover:animate-bounce-vertical"
              @mouseover="selectedFramework = option"
              @mouseleave="selectedFramework = null"
            >
              {{ option.heading }}
            </span>
          </li>
        </ul>
      </div>
      
      <!-- Right side - Framework details -->
      <div class="lg:w-1/2 mt-8 lg:mt-0 relative" style="top: -50px;">
        <transition name="fade">
          <div v-if="selectedFramework" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img :src="selectedFramework.image.url" :alt="selectedFramework.image.alternativeText" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">{{ selectedFramework.subheading }}</h3>
              <p class="text-white mb-6">{{ selectedFramework.body }}</p>
              <div class="flex">
                <ul class="space-y-2 w-1/2 pr-2">
                  <li v-for="(point, index) in selectedFramework.points.slice(0, 3)" :key="point.id" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point.body }}</span>
                  </li>
                </ul>
                <ul class="space-y-2 w-1/2 pl-2">
                  <li v-for="(point, index) in selectedFramework.points.slice(3, 6)" :key="point.id" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point.body }}</span>
                  </li>
                </ul>
              </div>
              <div class="mt-6 flex items-center text-white cursor-pointer group">
                <ArrowLeftIcon class="w-6 h-6 mr-2 group-hover:animate-bounce-horizontal" />
                <span class="text-lg font-semibold">{{ serviceTechnologyLeftData.subheading }}</span>
              </div>
            </div>
          </div>
          <div v-else class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img :src="serviceTechnologyLeftData.image.url" :alt="serviceTechnologyLeftData.image.alternativeText" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">{{ serviceTechnologyLeftData.heading }}</h3>
              <p class="text-white mb-6">{{ serviceTechnologyLeftData.body }}</p>
              <div class="mt-6 flex items-center text-white cursor-pointer group">
                <ArrowLeftIcon class="w-6 h-6 mr-2 group-hover:animate-bounce-horizontal" />
                <span class="text-lg font-semibold">{{ serviceTechnologyLeftData.subheading }}</span>
              </div>
            </div>
          </div>
        </transition>
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
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const serviceTechnologyLeftData = computed(() => state.value.serviceTechnologyLeftData)
const selectedFramework = ref(null)

// Initial data fetch
await dataStore.fetchServiceTechnologyLeftData()

// Watch for route changes
watch(() => route.path, async () => {
  await dataStore.fetchServiceTechnologyLeftData()
})

const refreshServiceTechnologyLeftData = async (): Promise<void> => {
  await dataStore.fetchServiceTechnologyLeftData()
}

defineExpose({ refreshServiceTechnologyLeftData })
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
  50% { transform: translateX(-10px); }
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