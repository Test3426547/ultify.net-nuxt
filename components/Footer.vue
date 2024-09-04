<template>
  <footer v-if="footerData || (logo && email)" class="bg-ultify-grey text-black h-[450px] flex flex-col">
    <div class="flex-grow"></div>
    
    <div class="h-1/5 flex justify-end items-start px-4">
      <img :src="footerData?.Logo.data.attributes.url || logo" class="h-[150px] w-auto mt-12" alt="Ultify Logo">
    </div>
    
    <div class="h-2/5 flex flex-col items-start justify-center px-4">
      <h2 class="text-2xl font-bold mb-4">{{ footerData?.Email || email }}</h2>
      <a href="#" @click.prevent="navigateAndRefresh(getInTouchLink.Link)" class="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition duration-300 self-start">{{ getInTouchLink.Text }}</a>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <ul class="flex space-x-4">
        <li v-for="link in socialLinks" :key="link.id">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline">{{ link.Text }}</a>
        </li>
      </ul>
      <ul class="flex space-x-4">
        <li v-for="(link, index) in legalLinks" :key="link.id">
          <a href="#" @click.prevent="navigateAndRefresh(link.Link)" class="hover:underline">{{ link.Text }}</a>
          <span v-if="index < legalLinks.length - 1">|</span>
        </li>
      </ul>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <span>{{ footerData?.Text || copyrightText }}</span>
      <ul class="flex space-x-2">
        <li v-for="pill in footerData?.Pill || pills" :key="pill.id">
          <a href="#" @click.prevent="navigateAndRefresh(pill.Link)" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">
            {{ pill.Text }}
          </a>
        </li>
      </ul>
    </div>
  </footer>
  <div v-else-if="error" class="bg-red-100 text-red-700 p-4">
    {{ errorText }}: {{ error }}
  </div>
  <div v-else-if="isLoading" class="bg-gray-100 text-gray-700 p-4">
    {{ loadingText }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

interface Link {
  id: string;
  Text: string;
  Link: string;
}

interface Pill {
  id: string;
  Text: string;
  Link: string;
}

interface FooterProps {
  logo?: string;
  email?: string;
  getInTouchText?: string;
  getInTouchLink?: string;
  socialLinks?: Link[];
  legalLinks?: Link[];
  copyrightText?: string;
  pills?: Pill[];
  errorText?: string;
  loadingText?: string;
}

const props = withDefaults(defineProps<FooterProps>(), {
  logo: '',
  email: '',
  getInTouchText: 'GET IN TOUCH',
  getInTouchLink: '/contact',
  socialLinks: () => [],
  legalLinks: () => [],
  copyrightText: '© 2023 Ultify Solutions. All rights reserved.',
  pills: () => [],
  errorText: 'Error loading footer',
  loadingText: 'Loading footer data...'
})

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const footerData = computed(() => state.value.footerData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.footer)

// Computed properties to organize links
const getInTouchLink = computed(() => footerData.value?.Link?.find(link => link.Text === "GET IN TOUCH") || { Text: props.getInTouchText, Link: props.getInTouchLink })
const socialLinks = computed(() => footerData.value?.Link?.filter(link => ["Facebook", "Instagram", "LinkedIn", "X"].includes(link.Text)) || props.socialLinks)
const legalLinks = computed(() => footerData.value?.Link?.filter(link => ["Privacy Policy", "Terms of Use", "Contact", "FAQ"].includes(link.Text)) || props.legalLinks)

const fetchFooterData = async () => {
  if (!state.value.footerData) {
    await dataStore.fetchFooterData()
  }
}

onMounted(() => {
  fetchFooterData()
})

// Watch for route changes
watch(() => route.path, () => {
  fetchFooterData()
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
/* Add any scoped styles here if needed */
</style>