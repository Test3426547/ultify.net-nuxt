<template>
  <section class="bg-ultify-dark-grey min-h-screen py-16">
    <div class="container mx-auto px-4">
      <div v-if="state.loading.faq" class="text-center">
        <p class="text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="localFaqData" class="space-y-8">
        <h2 class="text-4xl md:text-5xl font-extrabold text-white text-center">{{ localFaqData.Title }}</h2>
        <p class="text-xl text-white text-center">{{ localFaqData.Subtitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="(faq, index) in localFaqData.FAQ" :key="index" class="space-y-2">
            <div 
              class="bg-emerald-500 text-white rounded-full py-4 px-6 cursor-pointer flex justify-between items-center transition-transform duration-300 ease-in-out hover:-translate-y-1"
              :class="{ 'animate-bounce': faq.isBouncing }"
              @click="toggleAnswer(index)" 
              @mouseover="startBounce(index)" 
              @mouseleave="stopBounce(index)"
            >
              <span class="font-bold">{{ faq.Question }}</span>
              <span class="text-sm">{{ faq.showAnswer ? '▲' : '▼' }}</span>
            </div>
            <ScrollArea v-if="faq.showAnswer" class="h-40 rounded-lg bg-emerald-500 text-white">
              <div class="p-4">
                {{ faq.Answer }}
              </div>
            </ScrollArea>
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
import { useDataStore } from '../stores'
import { useRoute } from 'nuxt/app'
import ScrollArea from '../components/ui/scroll-area.vue'

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
        showAnswer: false,
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

const toggleAnswer = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].showAnswer = !localFaqData.value.FAQ[index].showAnswer
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