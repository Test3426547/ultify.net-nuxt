<template>
  <section :class="['cta-section', backgroundColor]" v-if="ctaData || title">
    <div class="container">
      <div class="cta-content">
        <h2 :class="['cta-title', textColor]">
          {{ ctaData?.Title || title }}
        </h2>
        <NuxtLink :to="ctaData?.Link || buttonLink" class="cta-button">{{ ctaData?.Text || buttonText }}</NuxtLink>
      </div>
    </div>
  </section>
  <div v-else-if="error" class="error-message">
    {{ loadingErrorText }}: {{ error }}
  </div>
  <div v-else-if="isLoading" class="loading-message">
    {{ loadingText }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

interface CTAProps {
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  textColor?: string;
  loadingText?: string;
  loadingErrorText?: string;
}

const props = withDefaults(defineProps<CTAProps>(), {
  title: 'Ready to get started?',
  buttonText: 'Get Started',
  buttonLink: '/contact',
  backgroundColor: 'bg-primary',
  textColor: 'text-white',
  loadingText: 'Loading CTA data...',
  loadingErrorText: 'Error loading CTA data'
})

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const ctaData = computed(() => state.value.ctaData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.cta)

const fetchCtaData = async () => {
  if (!state.value.ctaData) {
    await dataStore.fetchCTAData()
  }
}

onMounted(() => {
  fetchCtaData()
})

// Watch for route changes
watch(() => route.path, () => {
  fetchCtaData()
})

const refreshCtaData = async (): Promise<void> => {
  await dataStore.fetchCTAData()
}

defineExpose({ refreshCtaData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshCtaData()
}
</script>

<style scoped>
.cta-section {
  padding: 100px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.cta-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cta-title {
  font-size: 3rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0;
  max-width: 70%;
  margin-left: 0; /* Changed from 50px to 0 */
  padding-left: 0; /* Added to ensure no left padding */
}

.cta-button {
  background-color: #e9ecef;
  color: #000000;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  padding: 20px 40px;
  border-radius: 50px;
  transition: background-color 0.3s, color 0.3s;
  white-space: nowrap;
}

.cta-button:hover {
  background-color: #e6f7fc;
}

@media (max-width: 1024px) {
  .cta-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 768px) {
  .cta-section {
    padding: 80px 0;
  }

  .cta-content {
    flex-direction: column;
    text-align: center;
  }

  .cta-title {
    font-size: 3rem;
    max-width: 100%;
    margin-bottom: 40px;
    margin-left: 0;
  }

  .cta-button {
    font-size: 1.2rem;
    padding: 15px 30px;
  }
}
</style>