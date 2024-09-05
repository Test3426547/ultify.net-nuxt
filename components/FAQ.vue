<template>
  <section class="bg-ultify-dark-grey min-h-screen flex flex-col">
    <div class="container mx-auto px-4 max-w-6xl flex-grow flex flex-col justify-center py-12">
      <div v-if="state.loading.faq" class="text-center">
        <Skeleton class="h-8 w-64 mx-auto mb-4" />
        <Skeleton class="h-4 w-48 mx-auto" />
      </div>
      <div v-else-if="state.error" class="text-center">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>An error occurred while fetching data: {{ state.error }}</AlertDescription>
        </Alert>
      </div>
      <div v-else-if="localFaqData" class="space-y-8">
        <h2 class="text-5xl font-extrabold text-white text-center">{{ localFaqData.Title }}</h2>
        <p class="text-xl text-white text-center mb-8">{{ localFaqData.Subtitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(faq, index) in localFaqData.FAQ" :key="index" class="space-y-2">
            <Accordion type="single" :collapsible="true">
              <AccordionItem :value="`item-${index}`">
                <AccordionTrigger 
                  class="w-full bg-emerald-500 text-white rounded-full py-4 px-6 flex justify-between items-center min-h-[80px] hover:translate-y-[-5px] transition-transform duration-300 ease-in-out"
                  :class="{ 'animate-bounce': faq.isBouncing }"
                  @mouseover="startBounce(index)"
                  @mouseleave="stopBounce(index)"
                >
                  <span class="text-left font-bold">{{ faq.Question }}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <Card class="bg-emerald-500 text-white rounded-2xl overflow-hidden mt-2">
                    <CardContent class="p-4">
                      <ScrollArea class="h-48 pr-4">
                        <p>{{ faq.Answer }}</p>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
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
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const localFaqData = ref(null)

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