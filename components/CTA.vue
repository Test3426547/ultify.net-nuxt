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

<script setup>
import { useAsyncData, useRoute } from '#app'
import { watch, ref } from 'vue'

const route = useRoute()

const fetchCtaData = () => $fetch('/api/cta-data')

const ctaData = ref(null)

const { data, refresh } = await useAsyncData('ctaData', fetchCtaData, {
  server: true,
  lazy: false,
  watch: false,
})

// Initialize ctaData with the fetched data
ctaData.value = data.value

// Watch for route changes
watch(
  () => route.path,
  async (newPath) => {
    if (newPath === '/') {
      await refresh()
      // Update ctaData with the refreshed data
      ctaData.value = data.value
    }
  }
)

// Add this function to refresh the data
const refreshCtaData = async () => {
  await refresh()
}

// Expose the refresh function to the parent component
defineExpose({ refreshCtaData })

console.log('CTA Data:', ctaData.value);
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