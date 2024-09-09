<template>
  <footer v-if="footerData" class="bg-ultify-grey text-black min-h-[450px] flex flex-col p-4 md:p-6 lg:p-8">
    <div class="flex flex-col h-full justify-between">
      <div class="flex justify-end mb-8">
        <img :src="footerData.Logo.data.attributes.url" class="h-[100px] md:h-[150px] w-auto" alt="Ultify Logo">
      </div>
      
      <div class="flex flex-col space-y-8">
        <div class="flex flex-col items-start">
          <h2 class="text-xl md:text-2xl font-bold mb-4">{{ footerData.Email }}</h2>
          <a href="#" @click.prevent="navigateAndRefresh(getInTouchLink.Link)" class="border border-black rounded-full px-4 md:px-6 py-2 hover:bg-black hover:text-white transition duration-300 ease-in-out hover:-translate-y-1 self-start text-sm md:text-base">{{ getInTouchLink.Text }}</a>
        </div>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <ul class="flex flex-wrap space-x-4">
            <li v-for="link in socialLinks" :key="link.id">
              <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline transition duration-300 ease-in-out hover:-translate-y-1 inline-block text-sm md:text-base">{{ link.Text }}</a>
            </li>
          </ul>
          <ul class="flex flex-wrap space-x-2 md:space-x-4">
            <li v-for="(link, index) in legalLinks" :key="link.id" class="flex items-center">
              <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline transition duration-300 ease-in-out hover:-translate-y-1 inline-block text-sm md:text-base">{{ link.Text }}</a>
              <span v-if="index < legalLinks.length - 1" class="mx-1 md:mx-2">|</span>
            </li>
          </ul>
        </div>
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <span class="text-sm md:text-base">{{ footerData.Text }}</span>
          <ul class="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <li v-for="pill in footerData.Pill" :key="pill.id" class="w-full sm:w-auto">
              <a href="#" @click.prevent="navigateAndRefresh(pill.Link)" class="border border-black rounded-full px-3 md:px-4 py-1 hover:bg-black hover:text-white transition duration-300 ease-in-out hover:-translate-y-1 inline-flex items-center justify-center text-xs md:text-sm w-full h-full min-h-[32px]">
                <span class="text-center">{{ pill.Text }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  <div v-else-if="error" class="bg-red-100 text-red-700 p-4">
    Error loading footer: {{ error }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../../stores'
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
@media (max-width: 640px) {
  footer {
    height: auto;
  }
}
</style>