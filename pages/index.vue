<template>
  <div>
    <SuspenseWrapper>
      <HeaderHome />
    </SuspenseWrapper>
    <SuspenseWrapper>
      <QuickNEasy />
    </SuspenseWrapper>
    <SuspenseWrapper>
      <Carousel />
    </SuspenseWrapper>
    <SuspenseWrapper>
      <ServiceSelector />
    </SuspenseWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderHome from '@/components/HeaderHome.vue'
import QuickNEasy from '@/components/QuickNEasy.vue'
import Carousel from '@/components/Carousel.vue'
import ServiceSelector from '@/components/ServiceSelector.vue'

onMounted(async () => {
  try {
    const pageData = await $fetch('/api/home-page')
    // Update your page-specific data here
  } catch (err) {
    console.error('Error fetching page data:', err)
  }
})
</script>
<style scoped>
/* Additional styling specific to the Home page */
</style>
