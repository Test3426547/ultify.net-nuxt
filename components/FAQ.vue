<template>
  <section class="faq-section">
    <div class="container">
      <div v-if="state.loading.faq" class="text-center">
        <p class="text-lg">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="localFaqData">
        <h2 class="faq-title text-white font-extrabold">{{ localFaqData.Title }}</h2>
        <p class="faq-subtitle text-white">{{ localFaqData.Subtitle }}</p>
        <div class="faq-grid">
          <div v-for="(faq, index) in localFaqData.FAQ" :key="index" class="faq-item">
            <div 
              class="faq-question bg-primary text-white" 
              :class="{ 'isBouncing': faq.isBouncing }"
              @click="toggleAnswer(index)" 
              @mouseover="startBounce(index)" 
              @mouseleave="stopBounce(index)"
            >
              <span>{{ faq.Question }}</span>
              <span class="faq-icon">{{ faq.showAnswer ? '▲' : '▼' }}</span>
            </div>
            <div v-if="faq.showAnswer" class="faq-answer bg-primary text-white">
              {{ faq.Answer }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'

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

<style scoped>
.faq-section {
  background-color: #2B2A2A;
  padding: 100px 0; /* Retained 100px padding top and bottom */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.faq-title {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
}

.faq-subtitle {
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 60px;
}

.faq-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Changed back to 2 columns */
  gap: 30px;
}

.faq-item {
  margin-bottom: 20px;
}

.faq-question {
  padding: 15px 25px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
  transition: transform 0.3s ease-in-out;
  min-height: 80px;
}

.faq-question span:first-child {
  flex: 1;
  display: flex;
  align-items: center;
  line-height: 1.3;
}

.faq-question:hover {
  transform: translateY(-5px);
}

.faq-question.isBouncing {
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.faq-icon {
  font-size: 0.8rem;
  margin-left: 10px;
}

.faq-answer {
  padding: 20px;
  border-radius: 20px;
  margin-top: 10px;
}

@media (max-width: 768px) {
  .faq-section {
    padding: 60px 0;
  }

  .faq-title {
    font-size: 2.5rem;
  }

  .faq-subtitle {
    font-size: 1rem;
    margin-bottom: 40px;
  }

  .faq-grid {
    grid-template-columns: 1fr; /* Single column for mobile */
  }

  .faq-question {
    padding: 12px 20px;
    min-height: 60px;
  }
}
</style>