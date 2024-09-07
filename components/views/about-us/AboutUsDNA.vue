<template>
  <section class="bg-ultify-grey w-full">
    <div class="container mx-auto px-4 py-16 md:py-24">
      <div v-if="state.loading.ourDna" class="text-center">
        <p class="text-lg text-emerald-500">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="ourDnaData" class="flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="w-full md:w-1/2 space-y-6">
          <h2 class="text-4xl md:text-5xl font-bold text-emerald-500">{{ ourDnaData.title }}</h2>
          <div class="space-y-4">
            <template v-for="(paragraph, index) in ourDnaData.body" :key="paragraph.id">
              <p v-if="index < 2 || ourDnaData.showMore" class="text-emerald-500">
                {{ paragraph.Body }}
              </p>
            </template>
          </div>
          <button 
            v-if="ourDnaData.body && ourDnaData.body.length > 2"
            @click="toggleReadMore" 
            class="text-emerald-500 font-semibold flex items-center"
          >
            {{ ourDnaData.showMore ? ourDnaData.readMore[1].Body : ourDnaData.readMore[0].Body }}
            <svg 
              :class="{ 'rotate-180': ourDnaData.showMore }"
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
            v-if="ourDnaData.image" 
            :src="ourDnaData.image.url" 
            :alt="ourDnaData.image.alternativeText || 'DNA Image'" 
            class="w-full h-auto" 
          />
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-emerald-500">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const ourDnaData = computed(() => state.value.ourDnaData)

// Initial data fetch
await dataStore.fetchOurDnaData()

// Watch for route changes
watch(() => route.path, async () => {
  await dataStore.fetchOurDnaData()
})

const refreshOurDnaData = async (): Promise<void> => {
  await dataStore.fetchOurDnaData()
}

defineExpose({ refreshOurDnaData })

const toggleReadMore = (): void => {
  if (ourDnaData.value) {
    ourDnaData.value.showMore = !ourDnaData.value.showMore
  }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>
