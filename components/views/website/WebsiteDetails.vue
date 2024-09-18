<template>
  <div class="bg-ultify-grey min-h-screen" v-if="websiteDetails">
    <div
      v-for="(section, index) in websiteDetails.WebsiteDetails"
      :key="section.id"
      class="min-h-screen flex items-center justify-center p-8"
    >
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div :class="[
          'md:w-1/2',
          { 'md:order-last': index % 2 === 0 }
        ]">
          <h2 class="text-4xl font-bold text-emerald-500 mb-4">{{ section.Heading }}</h2>
          <p class="text-ultify-dark-grey">{{ section.Description }}</p>
        </div>
        <div :class="[
          'md:w-1/2',
          { 'md:order-first': index % 2 === 0 }
        ]">
          <img
            :src="section.Image.data.attributes.url"
            :alt="section.Heading"
            class="rounded-lg shadow-lg w-full h-auto"
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

const websiteDetails = computed(() => state.value.websiteDetailsData)
const error = computed(() => state.value.error)

// Fetch website details data
await dataStore.fetchWebsiteDetailsData()
</script>