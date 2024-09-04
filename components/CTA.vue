<template>
  <section class="cta-section bg-primary" v-if="ctaData">
    <div class="container">
      <div class="cta-content">
        <h2 class="cta-title text-white">
          {{ ctaData.Title }}
        </h2>
        <NuxtLink :to="ctaData.Link" class="cta-button">{{ ctaData.Text }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch, inject } from 'vue'
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const error = computed(() => state.value.error)

// Initial data fetch
dataStore.fetchCTAData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchCTAData()
})

const refreshCtaData = async (): Promise<void> => {
  await dataStore.fetchCTAData()
}

defineExpose({ refreshCtaData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshCtaData()
}

const sharedData = inject('sharedData')
const ctaData = computed(() => sharedData.value.cta)
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