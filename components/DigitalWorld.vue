<template>
  <section class="bg-gray-100 py-16 md:py-32 text-center" :class="{ 'pt-10': isConsultationPage }" v-if="digitalWorldData">
    <div class="container mx-auto px-4 max-w-6xl">
      <h2 class="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-20">{{ digitalWorldData.Title }}</h2>
      <div class="relative rounded-[30px] overflow-hidden shadow-lg mb-10 w-4/5 mx-auto">
        <img :src="digitalWorldData.Image.url" :alt="digitalWorldData.Image.alternativeText || 'Sydney Opera House'" class="w-full h-auto">
      </div>
      <div class="mb-10">
        <p class="text-base text-black mb-2">
          {{ digitalWorldData.Address.Address1 }}<br>
          {{ digitalWorldData.Address.Address2 }}<br>
          {{ digitalWorldData.Address.Address3 }}
        </p>
        <NuxtLink :to="getDirectionsLink.Link" class="text-sm text-black underline">{{ getDirectionsLink.Text }}</NuxtLink>
      </div>
      <div class="flex justify-center gap-24 flex-wrap">
        <NuxtLink 
          v-for="link in actionLinks" 
          :key="link.id" 
          :to="link.Link" 
          class="bg-emerald-500 text-white text-2xl md:text-3xl font-bold py-5 px-8 rounded-full w-60 inline-block transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:animate-bounce"
        >
          {{ link.Text }}
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
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.hover\:animate-bounce:hover {
  animation: bounce 1s infinite;
}
</style>