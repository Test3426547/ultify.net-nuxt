<template>
  <footer v-if="footerData" class="bg-ultify-grey text-black min-h-[450px] flex flex-col justify-between py-12 px-4">
    <div class="flex justify-end">
      <NuxtLink to="/">
        <img :src="footerData.Logo.data.attributes.url" class="h-[150px] w-auto" alt="Ultify Logo">
      </NuxtLink>
    </div>
    
    <div class="flex flex-col items-start">
      <h2 class="text-2xl font-bold mb-4 text-black">{{ footerData.Email }}</h2>
      <Button
        @click="navigateAndRefresh(getInTouchLink.Link)"
        variant="outline"
        class="rounded-full px-6 py-2 border-2 border-black font-extrabold hover:animate-bounce"
      >
        {{ getInTouchLink.Text }}
      </Button>
    </div>
    
    <div class="flex items-center justify-between">
      <ul class="flex space-x-4">
        <li v-for="link in socialLinks" :key="link.id">
          <Button
            @click="navigateAndRefresh(link.Link)"
            variant="ghost"
            class="hover:animate-bounce"
          >
            {{ link.Text }}
          </Button>
        </li>
      </ul>
      <ul class="flex space-x-4">
        <li v-for="(link, index) in legalLinks" :key="link.id">
          <Button
            @click="navigateAndRefresh(link.Link)"
            variant="ghost"
            class="hover:animate-bounce"
          >
            {{ link.Text }}
          </Button>
          <span v-if="index < legalLinks.length - 1" class="ml-4">|</span>
        </li>
      </ul>
    </div>
    
    <div class="flex items-center justify-between">
      <span>{{ footerData.Text }}</span>
      <ul class="flex space-x-2">
        <li v-for="pill in footerData.Pill" :key="pill.id">
          <Button
            @click="navigateAndRefresh(pill.Link)"
            variant="outline"
            class="rounded-full px-4 py-1 border-2 border-black font-extrabold hover:animate-bounce"
          >
            {{ pill.Text }}
          </Button>
        </li>
      </ul>
    </div>
  </footer>
  <Alert v-else-if="error" variant="destructive">
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      Error loading footer: {{ error }}
    </AlertDescription>
  </Alert>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'
import { Button } from '@/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const footerData = computed(() => state.value.footerData)
const error = computed(() => state.value.error)

// Computed properties to organize links
const getInTouchLink = computed(() => footerData.value?.Link?.find(link => link.Text === "GET IN TOUCH") || {} as Link)
const socialLinks = computed(() => footerData.value?.Link?.filter(link => ["Facebook", "Instagram", "LinkedIn", "X"].includes(link.Text)) || [])
const legalLinks = computed(() => footerData.value?.Link?.filter(link => ["Privacy Policy", "Terms of Use", "Contact", "FAQ"].includes(link.Text)) || [])

// Initial data fetch
dataStore.fetchFooterData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchFooterData()
})

const refreshFooterData = async (): Promise<void> => {
  await dataStore.fetchFooterData()
}

defineExpose({ refreshFooterData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshFooterData()
}
</script>

<style scoped>
@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.hover\:animate-bounce:hover {
  animation: bounce 0.3s ease-in-out infinite;
}
</style>