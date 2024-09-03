<template>
  <footer v-if="footerData" class="bg-ultify-grey text-black h-[450px] flex flex-col">
    <div class="flex-grow"></div>
    
    <div class="h-1/5 flex justify-end items-start px-4">
      <img :src="footerData.Logo.data.attributes.url" class="h-[150px] w-auto mt-12" alt="Ultify Logo">
    </div>
    
    <div class="h-2/5 flex flex-col items-start justify-center px-4">
      <h2 class="text-2xl font-bold mb-4">{{ footerData.Email }}</h2>
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
      <span>{{ footerData.Text }}</span>
      <ul class="flex space-x-2">
        <li v-for="pill in footerData.Pill" :key="pill.id">
          <a href="#" @click.prevent="navigateAndRefresh(pill.Link)" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">
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
import { useAsyncData, useNuxtApp } from '#app'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { $cachedFetch } = useNuxtApp()

const route = useRoute()
const router = useRouter()

interface Link {
  id: number;
  Text: string;
  Link: string;
}

interface Pill {
  id: number;
  Text: string;
  Link: string;
}

interface FooterData {
  Text: string;
  Email: string;
  Logo: {
    data: {
      attributes: {
        url: string;
      };
    };
  };
  Link: Link[];
  Pill: Pill[];
}

const footerData = ref<FooterData | null>(null)
const error = ref<Error | null>(null)

const fetchFooterData = async (): Promise<void> => {
  try {
    const { data, pending, error: fetchError } = await useAsyncData<FooterData>(
      'footerData',
      () => $fetch('/api/footer-data')
    )

    if (fetchError.value) {
      throw fetchError.value
    }

    console.log('Raw footer data:', data.value) // Debug log

    if (!data.value || typeof data.value !== 'object') {
      throw new Error('Invalid footer data structure')
    }

    footerData.value = data.value

    console.log('Parsed footer attributes:', footerData.value) // Debug log

    if (!footerData.value.Text || !footerData.value.Email || !footerData.value.Logo || !footerData.value.Link || !footerData.value.Pill) {
      throw new Error('Missing required footer data fields')
    }
  } catch (err) {
    console.error('Error fetching Footer data:', err)
    error.value = err instanceof Error ? err : new Error('An unknown error occurred')
  }
}

const fetchFooterData = async (): Promise<void> => {
  try {
    const { data } = await useAsyncData('componentData', () => $cachedFetch())
    
    if (!data.value || typeof data.value !== 'object') {
      throw new Error('Invalid component data structure')
    }

    footerData.value = data.value.footerData

    if (!footerData.value.Text || !footerData.value.Email || !footerData.value.Logo || !footerData.value.Link || !footerData.value.Pill) {
      throw new Error('Missing required footer data fields')
    }
  } catch (err) {
    console.error('Error fetching Footer data:', err)
    error.value = err instanceof Error ? err : new Error('An unknown error occurred')
  }
}

</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>