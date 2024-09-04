<template>
  <section class="faq-section" :class="backgroundColor">
    <div class="container">
      <div v-if="isLoading" class="text-center">
        <p class="text-lg" :class="textColor">{{ loadingText }}</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-600">{{ errorText }}: {{ error }}</p>
      </div>
      <div v-else-if="localFaqData || (title && faqs.length)">
        <h2 class="faq-title font-extrabold" :class="textColor">{{ localFaqData?.Title || title }}</h2>
        <p class="faq-subtitle" :class="textColor">{{ localFaqData?.Subtitle || subtitle }}</p>
        <div class="faq-grid">
          <div v-for="(faq, index) in localFaqData?.FAQ || faqs" :key="index" class="faq-item">
            <div 
              class="faq-question" 
              :class="[questionBackgroundColor, questionTextColor, { 'isBouncing': faq.isBouncing }]"
              @click="toggleAnswer(index)" 
              @mouseover="startBounce(index)" 
              @mouseleave="stopBounce(index)"
            >
              <span>{{ faq.Question }}</span>
              <span class="faq-icon">{{ faq.showAnswer ? '▲' : '▼' }}</span>
            </div>
            <div v-if="faq.showAnswer" class="faq-answer" :class="[answerBackgroundColor, answerTextColor]">
              {{ faq.Answer }}
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg" :class="textColor">{{ noDataText }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'

interface FAQ {
  Question: string;
  Answer: string;
  showAnswer?: boolean;
  isBouncing?: boolean;
}

interface FAQProps {
  title?: string;
  subtitle?: string;
  faqs?: FAQ[];
  backgroundColor?: string;
  textColor?: string;
  questionBackgroundColor?: string;
  questionTextColor?: string;
  answerBackgroundColor?: string;
  answerTextColor?: string;
  loadingText?: string;
  errorText?: string;
  noDataText?: string;
}

const props = withDefaults(defineProps<FAQProps>(), {
  title: 'Frequently Asked Questions',
  subtitle: 'Find answers to common questions about our services',
  faqs: () => [],
  backgroundColor: 'bg-gray-100',
  textColor: 'text-gray-900',
  questionBackgroundColor: 'bg-primary',
  questionTextColor: 'text-white',
  answerBackgroundColor: 'bg-primary',
  answerTextColor: 'text-white',
  loadingText: 'Loading...',
  errorText: 'An error occurred while fetching data',
  noDataText: 'No data available.'
})

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const localFaqData = ref(null)
const isLoading = computed(() => state.value.loading.faq)
const error = computed(() => state.value.error)

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

const fetchFAQData = async () => {
  if (!state.value.faqData) {
    await dataStore.fetchFAQData()
  }
}

onMounted(() => {
  fetchFAQData()
})

// Watch for route changes
watch(() => route.path, () => {
  fetchFAQData()
})

const toggleAnswer = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].showAnswer = !localFaqData.value.FAQ[index].showAnswer
  } else if (props.faqs[index]) {
    props.faqs[index].showAnswer = !props.faqs[index].showAnswer
  }
}

const startBounce = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].isBouncing = true
  } else if (props.faqs[index]) {
    props.faqs[index].isBouncing = true
  }
}

const stopBounce = (index: number): void => {
  if (localFaqData.value) {
    localFaqData.value.FAQ[index].isBouncing = false
  } else if (props.faqs[index]) {
    props.faqs[index].isBouncing = false
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