<template>
  <header class="relative h-screen overflow-hidden" v-if="headerData">
    <div class="absolute inset-0 bg-white h-1/2"></div>
    <div class="absolute inset-0 top-1/2 bg-emerald-500"></div>
    <div class="container mx-auto h-full">
      <div class="flex h-full">
        <div class="w-full lg:w-7/12 flex flex-col py-5 relative">
          <div class="absolute top-1/4 mt-12 -ml-24 z-10">
            <h1 class="text-5xl font-bold text-emerald-500 mb-4">
              {{ headerData.Title }}
            </h1>
            <p class="text-xl text-emerald-500">
              {{ headerData.Subtitle }}
            </p>
          </div>
          <div class="absolute top-1/2 mt-16 -ml-24 z-10">
            <h2 class="text-5xl font-bold text-white mb-4">
              {{ headerData.Heading }}
            </h2>
            <p class="text-xl text-white mb-8">
              {{ headerData.Subheading }}
            </p>
            <div class="grid grid-cols-3 gap-4 max-w-xl mt-16">
              <HoverCard v-for="link in headerData.Link" :key="link.id">
                <HoverCardTrigger asChild>
                  <Button 
                    :to="link.Link" 
                    variant="outline"
                    class="pill-button"
                  >
                    {{ link.Text }}
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent class="w-80 hover-card-content">
                  <div class="flex justify-between space-x-4">
                    <div>
                      <h4 class="text-sm font-semibold">{{ link.Text }}</h4>
                      <p class="text-sm">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
        </div>
        <div class="w-full lg:w-5/12 flex justify-center items-center relative pl-12">
          <ContactForm @submit="handleSubmit" />
        </div>
      </div>
    </div>
    <ScrollArea class="h-full w-full">
      <svg class="absolute bottom-5 left-1/2 transform -translate-x-1/2 animate-bounce" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 35L36.5 18.5L33.25 15.25L23.5 25V0H16.5V25L6.75 15.25L3.5 18.5L20 35Z" fill="white"/>
      </svg>
    </ScrollArea>
  </header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '../stores'
import { computed } from 'vue'
import ContactForm from '@/components/ContactForm.vue'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const headerData = computed(() => state.value.headerData)
const error = computed(() => state.value.error)

// Fetch header data
await dataStore.fetchHeaderData()

interface FormData {
  [key: string]: any;
}

const handleSubmit = (formData: FormData): void => {
  console.log('Form submitted:', formData);
};
</script>

<style scoped>
.pill-button {
  @apply bg-transparent border-2 border-white text-white rounded-full py-3 px-4 font-extrabold text-lg transition-all duration-300 hover:bg-white hover:text-emerald-500 text-center;
}

.hover-card-content {
  @apply rounded-[2rem] !important;
}
</style>