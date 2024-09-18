<template>
    <div class="bg-ultify-grey min-h-screen" v-if="contentCreationDetails">
      <div
        v-for="(section, index) in contentCreationDetails.ContentCreationDetails"
        :key="section.id"
        class="flex items-center justify-center py-16"
      >
        <div class="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center">
          <div
            :class="[
              'md:w-[calc(50%-70px)]',
              { 'md:order-last md:ml-[140px]': index % 2 === 0, 'md:mr-[140px]': index % 2 !== 0 }
            ]"
          >
            <h2 class="text-4xl font-bold text-emerald-500 mb-4">{{ section.Heading }}</h2>
            <p class="text-ultify-dark-grey">{{ section.Description }}</p>
          </div>
          <div
            :class="[
              'md:w-[calc(50%-70px)]',
              { 'md:order-first': index % 2 === 0 }
            ]"
          >
            <img
              :src="section.Image.data.attributes.url"
              :alt="section.Heading"
              class="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { storeToRefs } from 'pinia'
  import { useDataStore } from '@/stores'
  import { computed } from 'vue'
  
  const dataStore = useDataStore()
  const { state } = storeToRefs(dataStore)
  
  const contentCreationDetails = computed(() => state.value.contentCreationDetailsData)
  const error = computed(() => state.value.error)
  
  // Fetch content creation details data
  await dataStore.fetchContentCreationDetailsData()
  </script>
  
  <style scoped>
  
  </style>