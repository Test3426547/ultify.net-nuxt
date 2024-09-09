<template>
  <section class="bg-ultify-dark-grey min-h-screen py-8 sm:py-12 md:py-16">
    <div class="container mx-auto px-4 max-w-6xl">
      <div v-if="state.loading.faq" class="text-center">
        <p class="text-base sm:text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-base sm:text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="localFaqData" class="space-y-8 sm:space-y-12">
        <h2 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white text-center mb-4 sm:mb-6 md:mb-8">{{ localFaqData.Title }}</h2>
        <p class="text-xl sm:text-2xl text-white text-center mb-8 sm:mb-10 md:mb-12">{{ localFaqData.Subtitle }}</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <div v-for="(faq, index) in localFaqData.FAQ" :key="index" class="space-y-2 sm:space-y-4">
            <div 
              class="bg-emerald-500 text-white rounded-full py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-10 cursor-pointer flex justify-between items-center transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1 min-h-[80px] sm:min-h-[100px] md:min-h-[120px]"
              @click="toggleAnswer(index)"
            >
              <span class="font-bold text-base sm:text-lg md:text-xl">{{ faq.Question }}</span>
              <span class="text-xl sm:text-2xl flex-shrink-0 ml-2 sm:ml-4">{{ faq.showAnswer ? '▲' : '▼' }}</span>
            </div>
            <ScrollArea v-if="faq.showAnswer" class="h-32 sm:h-40 md:h-48 rounded-3xl bg-emerald-500 text-white overflow-hidden">
              <div class="p-4 sm:p-5 md:p-6">
                <p class="text-base sm:text-lg">{{ faq.Answer }}</p>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg text-white">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { useRoute } from 'nuxt/app'
import ScrollArea from '@/components/ui/scroll-area.vue'

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
        showAnswer: false
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
    localFaqData.value.FAQ.forEach((faq, i) => {
      faq.showAnswer = i === index ? !faq.showAnswer : false
    })
  }
}

const refreshFAQData = async (): Promise<void> => {
  await dataStore.fetchFAQData()
}

defineExpose({ refreshFAQData })
</script>

<style scoped>
.scroll-area {
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.5) transparent;
}

.scroll-area::-webkit-scrollbar {
  width: 6px;
}

.scroll-area::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

@media (min-width: 640px) {
  .scroll-area::-webkit-scrollbar {
    width: 8px;
  }

  .scroll-area::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
}
</style>