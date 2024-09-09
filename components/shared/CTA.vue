<template>
  <section class="bg-emerald-500 py-16 sm:py-20 md:py-24 lg:py-28" v-if="ctaData">
    <div class="container mx-auto px-4 max-w-7xl relative">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8 md:mb-0 md:mr-8 max-w-3xl text-center md:text-left left-section">
          {{ ctaData.Title }}
        </h2>
        <NuxtLink 
          :to="ctaData.Link" 
          class="bg-ultify-grey text-black text-lg sm:text-xl md:text-2xl font-bold px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 rounded-full transition-all duration-300 ease-in-out hover:bg-opacity-90 hover:scale-105 right-pill w-full md:w-auto text-center"
        >
          {{ ctaData.Text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const ctaData = computed(() => state.value.ctaData)
const error = computed(() => state.value.error)

// Initial data fetch
dataStore.fetchCTAData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchCTAData()
})

const refreshCtaData = async (): Promise<void> => {
  await dataStore.fetchCTAData()
}

defineExpose({ refreshCtaData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshCtaData()
}
</script>

<style scoped>
.left-section {
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

.right-pill {
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;
}

@media (min-width: 768px) {
  .left-section {
    transform: translateX(-50px);
  }

  .right-pill {
    transform: translateX(50px);
  }
}

@media (max-width: 767px) {
  .left-section, .right-pill {
    transform: none;
  }
}
</style>