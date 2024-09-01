<template>
  <section class="quick-n-easy bg-bs-primary text-bs-white py-5">
    <div class="container">
      <div v-if="pending" class="text-center">
        <p class="text-lg">Loading...</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ error.message }}</p>
      </div>
      <div v-else-if="qneData" class="row align-items-center">
        <!-- Left column with text content -->
        <div class="col-lg-6">
          <h2 class="mb-4 fw-bold">{{ qneData.Title }}</h2>
          
          <!-- Numbered list -->
          <div class="numbered-list">
            <div class="list-item d-flex mb-3" v-for="(item, index) in qneData.Body" :key="item.id">
              <div class="number me-3">{{ index + 1 }}</div>
              <p>{{ item.Body }}</p>
            </div>
          </div>
          
          <!-- Consult Now button -->
          <a href="#" @click.prevent="navigateAndRefresh(qneData.Link)" class="btn bg-bs-white text-bs-primary rounded-pill px-4 py-2 mt-3">
            {{ qneData.Text }}
          </a>
        </div>
        
        <!-- Right column with image -->
        <div class="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-end">
          <img v-if="qneData.Image" :src="qneData.Image" :alt="qneData.Title" class="img-fluid quick-easy-image">
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAsyncData } from '#app'
import { ref, onErrorCaptured, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const qneData = ref(null)
const pending = ref(true)
const error = ref(null)

const fetchQNEData = async () => {
  try {
    const { data, pending: fetchPending, error: fetchError } = await useAsyncData(
      'qneData',
      () => $fetch('/api/qne-data', { query: { lang: route.params.lang || 'en' } })
    )

    qneData.value = data.value
    pending.value = fetchPending.value
    if (fetchError.value) {
      throw fetchError.value
    }
  } catch (err) {
    console.error('Error fetching QNE data:', err)
    error.value = err
  } finally {
    pending.value = false
  }
}

// Initial data fetch
fetchQNEData()

// Watch for route changes
watch(() => route.path, async () => {
  await fetchQNEData()
})

const refreshQNEData = async () => {
  await fetchQNEData()
}

const navigateAndRefresh = async (path) => {
  await router.push(path)
  await refreshQNEData()
}

// Expose the refresh function to the parent component
defineExpose({ refreshQNEData })

console.log('Quick n Easy Data:', qneData.value)

onErrorCaptured((err) => {
  console.error('Error captured in QuickNEasy.vue:', err)
  error.value = err
  return true
})
</script>

<style scoped>
.quick-n-easy {
  background-color: var(--bs-primary);
  color: var(--bs-white);
}

.number {
  width: 30px;
  height: 30px;
  border: 2px solid var(--bs-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: bold;
}

.list-item p {
  margin-bottom: 0;
  font-size: 0.9rem;
}

.btn {
  font-weight: bold;
}

.quick-easy-image {
  max-width: 80%;
  margin-left: auto;
}

@media (max-width: 991.98px) {
  .quick-n-easy h2 {
    font-size: 1.75rem;
  }
  
  .list-item {
    font-size: 0.9rem;
  }

  .quick-easy-image {
    max-width: 100%;
    margin-top: 2rem;
  }
}
</style>
