<template>
  <footer v-if="footerData" class="bg-ultify-grey text-black h-[450px] flex flex-col">
    <div class="flex-grow"></div>
    
    <div class="h-1/5 flex justify-end items-start px-4">
      <NuxtLink to="/" class="mt-12">
        <img :src="footerData.Logo.data.attributes.url" class="h-[150px] w-auto" alt="Ultify Logo">
      </NuxtLink>
    </div>
    
    <div class="h-2/5 flex flex-col items-start justify-center px-4">
      <h2 class="text-2xl font-bold mb-4 text-black">{{ footerData.Email }}</h2>
      <a href="#" @click.prevent="navigateAndRefresh(getInTouchLink.Link)" class="border border-black text-black rounded-full px-6 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1">{{ getInTouchLink.Text }}</a>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <ul class="flex space-x-4">
        <li v-for="link in socialLinks" :key="link.id">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block">{{ link.Text }}</a>
        </li>
      </ul>
      <ul class="flex space-x-4">
        <li v-for="(link, index) in legalLinks" :key="link.id">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block">{{ link.Text }}</a>
          <span v-if="index < legalLinks.length - 1" class="ml-4">|</span>
        </li>
      </ul>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <span>{{ footerData.Text }}</span>
      <ul class="flex space-x-2">
        <li v-for="pill in footerData.Pill" :key="pill.id">
          <a href="#" @click.prevent="navigateAndRefresh(pill.Link)" class="border border-black text-black rounded-full px-4 py-1 transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block">
            {{ pill.Text }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
  <div v-else-if="error" class="bg-red-100 text-red-700 p-4">
    Error loading footer: {{ error }}
  </div>
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
/* Any additional styles can be added here if needed */
</style>