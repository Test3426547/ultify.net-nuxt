<template>
    <section class="bg-ultify-grey w-full">
      <div class="container mx-auto px-4 py-16 md:py-24">
        <div v-if="isLoading" class="text-center">
          <p class="text-lg text-ultify-blue">{{ loadingText }}</p>
        </div>
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-red-600">{{ errorText }}: {{ error }}</p>
        </div>
        <div v-else-if="ourDnaData || title" class="flex flex-col md:flex-row items-center justify-between gap-12">
          <div class="w-full md:w-1/2 space-y-6">
            <h2 class="text-4xl md:text-5xl font-bold text-ultify-blue">{{ ourDnaData?.title || title }}</h2>
            <div class="space-y-4">
              <template v-for="(paragraph, index) in ourDnaData?.body || paragraphs" :key="paragraph.id">
                <p v-if="index < 2 || showMore" class="text-ultify-blue">
                  {{ paragraph.Body }}
                </p>
              </template>
            </div>
            <button 
              v-if="(ourDnaData?.body && ourDnaData.body.length > 2) || paragraphs.length > 2"
              @click="toggleReadMore" 
              class="text-ultify-blue font-semibold flex items-center"
            >
              {{ showMore ? (ourDnaData?.readMore[1].Body || readLessText) : (ourDnaData?.readMore[0].Body || readMoreText) }}
              <svg 
                :class="{ 'rotate-180': showMore }"
                class="w-4 h-4 ml-2 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
          </div>
          <div class="w-full md:w-1/2">
            <img 
              v-if="ourDnaData?.image || imageUrl" 
              :src="ourDnaData?.image?.url || imageUrl" 
              :alt="ourDnaData?.image?.alternativeText || imageAlt" 
              class="w-full h-auto" 
            />
          </div>
        </div>
        <div v-else class="text-center">
          <p class="text-lg text-ultify-blue">{{ noDataText }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useDataStore } from '~/stores'
  import { computed, ref, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  
  interface Paragraph {
    id: string;
    Body: string;
  }
  
  interface OurDNAProps {
    title?: string;
    paragraphs?: Paragraph[];
    imageUrl?: string;
    imageAlt?: string;
    readMoreText?: string;
    readLessText?: string;
    loadingText?: string;
    errorText?: string;
    noDataText?: string;
  }
  
  const props = withDefaults(defineProps<OurDNAProps>(), {
    title: 'Our DNA',
    paragraphs: () => [],
    imageUrl: '',
    imageAlt: 'DNA Image',
    readMoreText: 'Read More',
    readLessText: 'Read Less',
    loadingText: 'Loading...',
    errorText: 'An error occurred while fetching data',
    noDataText: 'No data available.'
  })
  
  const route = useRoute()
  const dataStore = useDataStore()
  
  const { state } = storeToRefs(dataStore)
  
  const ourDnaData = computed(() => state.value.ourDnaData)
  const isLoading = computed(() => state.value.loading.ourDna)
  const error = computed(() => state.value.error)
  
  const showMore = ref(false)
  
  const fetchOurDnaData = async () => {
    await dataStore.fetchOurDnaData()
  }
  
  onMounted(() => {
    fetchOurDnaData()
  })
  
  // Watch for route changes
  watch(() => route.path, fetchOurDnaData)
  
  const refreshOurDnaData = async (): Promise<void> => {
    await fetchOurDnaData()
  }
  
  defineExpose({ refreshOurDnaData })
  
  const toggleReadMore = (): void => {
    showMore.value = !showMore.value
  }
  </script>

<style scoped>
/* Add any scoped styles here */
</style>
