<template>
  <section class="bg-ultify-dark-grey py-24">
    <div class="container mx-auto px-4 max-w-6xl">
      <div v-if="state.loading.faq" class="text-center">
        <p class="text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="localFaqData" class="space-y-8">
        <h2 class="text-5xl font-extrabold text-white text-center">{{ localFaqData.Title }}</h2>
        <p class="text-xl text-white text-center mb-16">{{ localFaqData.Subtitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(faq, index) in localFaqData.FAQ" :key="index" class="space-y-2">
            <Collapsible @update:open="handleCollapsibleUpdate(index, $event)">
              <CollapsibleTrigger 
                class="w-full bg-emerald-500 text-white rounded-full py-4 px-6 flex justify-between items-center min-h-[80px] hover:translate-y-[-5px] transition-transform duration-300 ease-in-out"
                :class="{ 'animate-bounce': faq.isBouncing }"
                @mouseover="startBounce(index)"
                @mouseleave="stopBounce(index)"
              >
                <span class="text-left font-bold">{{ faq.Question }}</span>
                <ChevronDown
                  :class="{ 'transform rotate-180': openIndex === index }"
                  class="h-4 w-4 transition-transform duration-200"
                />
              </CollapsibleTrigger>
              <CollapsibleContent class="mt-2">
                <Card class="bg-emerald-500 text-white rounded-2xl overflow-hidden">
                  <CardContent class="p-0">
                    <ScrollArea class="h-48 p-6">
                      <p>{{ faq.Answer }}</p>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-white">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown } from 'lucide-vue-next'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const localFaqData = ref(null)
const openIndex = ref(null)

watch(() => state.value.faqData, (newFaqData) => {
  if (newFaqData) {
    localFaqData.value = {
      ...newFaqData,
      FAQ: newFaqData.FAQ.map(faq => ({
        ...faq,
        isBouncing: false
      }))
    }
  }
}, { immediate: true })

// Fetch data only if it doesn't exist
if (!state.value.faqData) {
  dataStore.fetchFAQData()
}

// Watch for route changes
watch(() => route.path, () => {
  if (!state.value.faqData) {
    dataStore.fetchFAQData()
  }
})

const handleCollapsibleUpdate = (index: number, isOpen: boolean) => {
  if (isOpen) {
    openIndex.value = index
  } else if (openIndex.value === index) {
    openIndex.value = null
  }
}

const startBounce = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].isBouncing = true
  }
}

const stopBounce = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].isBouncing = false
  }
}

const refreshFAQData = async (): Promise<void> => {
  await dataStore.fetchFAQData()
}

defineExpose({ refreshFAQData })
</script>

<style scoped>
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
</style>