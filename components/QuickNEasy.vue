<template>
  <section class="quick-n-easy bg-bs-primary text-bs-white py-5">
    <div class="container">
      <div class="row align-items-center">
        <div v-if="pending">Loading...</div>
        <template v-else-if="qneData">
          <!-- Left column with text content -->
          <div class="col-lg-6">
            <h2 class="mb-4 fw-bold">{{ qneData.Title }}</h2>
            
            <!-- Numbered list -->
            <div class="numbered-list">
              <div class="list-item d-flex mb-3" v-for="(item, index) in qneData.Body" :key="index">
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
            <img :src="qneData.Image.url" :alt="qneData.Image.alternativeText" class="img-fluid quick-easy-image">
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAsyncData, useFetch } from '#app'
import { watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const qneData = ref(null)
const pending = ref(true)

const fetchQNEData = async () => {
  pending.value = true
  try {
    const { data } = await useFetch('/api/qne-data')
    qneData.value = data.value
  } catch (error) {
    console.error('Error fetching Quick n Easy data:', error)
  } finally {
    pending.value = false
  }
}

// Watch for route changes
watch(() => route.path, async () => {
  await fetchQNEData()
})

onMounted(fetchQNEData)

// Add this function to refresh the data
const refreshQNEData = async () => {
  await fetchQNEData()
}

// Expose the refresh function to the parent component
defineExpose({ refreshQNEData })

// Add this function to handle navigation and refresh
const navigateAndRefresh = async (path) => {
  await router.push(path)
  // After navigation, refresh the header data if needed
  const headerComponent = document.querySelector('header')?.querySelector('script')
  if (headerComponent && 'refreshHeaderData' in headerComponent) {
    await (headerComponent as any).refreshHeaderData()
  }
  // Refresh the current component data
  await refreshQNEData()
}

console.log('Quick n Easy Data:', qneData.value)
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