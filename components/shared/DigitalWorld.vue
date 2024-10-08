<template>
  <section class="bg-ultify-grey py-12 sm:py-16 md:py-20 lg:py-24 text-center" :class="{ 'pt-6 sm:pt-8 md:pt-10': isConsultationPage }" v-if="digitalWorldData">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-emerald-500 mb-10 sm:mb-16 md:mb-20">{{ digitalWorldData.Title }}</h2>
      <div class="relative w-full sm:w-11/12 md:w-4/5 mx-auto mb-8 sm:mb-10 rounded-3xl overflow-hidden shadow-lg">
        <img :src="digitalWorldData.Image.url" :alt="digitalWorldData.Image.alternativeText || 'Sydney Opera House'" class="w-full h-auto">
      </div>
      <div class="mb-8 sm:mb-10">
        <p class="text-sm sm:text-base text-black mb-2">
          {{ digitalWorldData.Address.Address1 }}<br>
          {{ digitalWorldData.Address.Address2 }}<br>
          {{ digitalWorldData.Address.Address3 }}
        </p>
        <NuxtLink :to="getDirectionsLink.Link" class="text-xs sm:text-sm text-black underline">{{ getDirectionsLink.Text }}</NuxtLink>
      </div>
      <div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-8 lg:space-x-24">
        <NuxtLink 
          v-for="link in actionLinks" 
          :key="link.id" 
          :to="link.Link" 
          class="px-6 sm:px-8 py-4 sm:py-5 text-xl sm:text-2xl font-bold text-white bg-emerald-500 rounded-full transition-transform duration-300 ease-in-out hover:animate-bounce w-full sm:w-56 flex items-center justify-center whitespace-nowrap"
        >
          {{ link.Text }}
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

const digitalWorldData = computed(() => state.value.digitalWorldData)
const error = computed(() => state.value.error)

const isConsultationPage = computed(() => route.path === '/consultation')

const getDirectionsLink = computed(() => digitalWorldData.value?.Address.Link.find(link => link.Text === "Get Directions") || {})
const actionLinks = computed(() => digitalWorldData.value?.Address.Link.filter(link => ["About Us", "Contact Us"].includes(link.Text)) || [])

// Initial data fetch
dataStore.fetchDigitalWorldData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchDigitalWorldData()
})

const refreshDigitalWorldData = async (): Promise<void> => {
  await dataStore.fetchDigitalWorldData()
}

defineExpose({ refreshDigitalWorldData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshDigitalWorldData()
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hover\:animate-bounce:hover {
  animation: bounce 1s infinite;
}

@media (max-width: 640px) {
  .hover\:animate-bounce:hover {
    animation: none;
  }
}
</style>