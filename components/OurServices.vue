<template>
  <section class="our-services">
    <div class="bg-primary text-white py-5 banner">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto text-center">
            <h2 class="display-4 fw-bold text-white">{{ servicesData?.title }}</h2>
            <p class="lead text-white">{{ servicesData?.subtitle }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-primary py-5">
      <div class="container">
        <div v-if="pending" class="text-center">
          <p class="text-lg text-white">Loading...</p>
        </div>
        <div v-else-if="error" class="text-center">
          <p class="text-lg text-danger">An error occurred while fetching data: {{ error.message }}</p>
        </div>
        <div v-else-if="servicesData" class="row g-4">
          <ServiceCard
            v-for="service in servicesData.serviceCards"
            :key="service.id"
            :title="service.heading"
            :description="service.body"
            :imgSrc="service.image.url"
            :altText="service.image.alternativeText || `${service.heading} Service`"
            :id="service.id"
          />
        </div>
        <div v-else class="text-center">
          <p class="text-lg text-white">No data available.</p>
        </div>
      </div>
    </div>
    <div class="bg-light py-5"></div>
  </section>
</template>

<script setup>
import { useAsyncData } from '#app'
import { ref, onErrorCaptured, watch } from 'vue'
import { useRoute } from 'vue-router'
import ServiceCard from './ServiceCard.vue'

const route = useRoute()

const servicesData = ref(null)
const pending = ref(true)
const error = ref(null)

const fetchServicesData = async () => {
  try {
    const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
      'ourServicesData',
      () => $fetch('/api/our-services-data')
    )

    servicesData.value = data.value
    pending.value = fetchPending.value
    if (fetchError.value) {
      throw fetchError.value
    }
  } catch (err) {
    console.error('Error fetching Services data:', err)
    error.value = err
  } finally {
    pending.value = false
  }
}

// Initial data fetch
fetchServicesData()

// Watch for route changes
watch(() => route.path, async () => {
  await fetchServicesData()
})

// Add this function to refresh the data
const refreshServicesData = async () => {
  await fetchServicesData()
}

// Expose the refresh function to the parent component
defineExpose({ refreshServicesData })

onErrorCaptured((err) => {
  console.error('Error captured in OurServices.vue:', err)
  error.value = err
  return true
})
</script>

<style scoped>
.banner {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>