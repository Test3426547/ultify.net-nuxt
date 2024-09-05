<template>
  <section class="bg-emerald-500 py-24" v-if="ctaData">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex justify-between items-center flex-col md:flex-row">
        <h2 class="text-5xl font-bold text-white mb-10 md:mb-0 md:max-w-[70%] text-center md:text-left">
          {{ ctaData.Title }}
        </h2>
        <NuxtLink 
          :to="ctaData.Link" 
          class="bg-[#2B2A2A] text-black text-2xl font-bold px-10 py-5 rounded-full transition-transform duration-300 ease-in-out hover:animate-bounce"
        >
          {{ ctaData.Text }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'

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
@keyframes bounce {
  0%, 100% {
    transform: translateY(-5%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}
.hover\:animate-bounce:hover {
  animation: bounce 0.6s infinite;
}
</style>