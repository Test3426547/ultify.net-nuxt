<template>
  <footer v-if="footerData" class="bg-ultify-grey text-black h-[450px] flex flex-col">
    <div class="flex-grow"></div>
    
    <div class="h-1/5 flex justify-end items-start px-4">
      <img :src="footerData.Logo.data.attributes.url" class="h-[150px] w-auto mt-12" alt="Ultify Logo">
    </div>
    
    <div class="h-2/5 flex flex-col items-start justify-center px-4">
      <h2 class="text-2xl font-bold mb-4">{{ footerData.Email }}</h2>
      <a href="#" @click.prevent="navigateAndRefresh(getInTouchLink.Link)" class="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition duration-300 ease-in-out hover:-translate-y-1 self-start">{{ getInTouchLink.Text }}</a>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <ul class="flex space-x-4">
        <li v-for="link in socialLinks" :key="link.id">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline transition duration-300 ease-in-out hover:-translate-y-1 inline-block">{{ link.Text }}</a>
        </li>
      </ul>
      <ul class="flex space-x-4">
        <li v-for="(link, index) in legalLinks" :key="link.id" class="flex items-center">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline transition duration-300 ease-in-out hover:-translate-y-1 inline-block">{{ link.Text }}</a>
          <span v-if="index < legalLinks.length - 1" class="mx-2">|</span>
        </li>
      </ul>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <span>{{ footerData.Text }}</span>
      <ul class="flex space-x-2">
        <li v-for="pill in footerData.Pill" :key="pill.id">
          <a href="#" @click.prevent="navigateAndRefresh(pill.Link)" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300 ease-in-out hover:-translate-y-1 inline-block">
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
import { useDataStore } from '../stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'nuxt/app'

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