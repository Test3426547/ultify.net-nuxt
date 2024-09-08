<template>
  <header class="bg-ultify-grey py-48">
    <div class="container mx-auto px-5 max-w-7xl">
      <div v-if="loading" class="text-center">
        <p class="text-lg text-ultify-blue">Loading...</p>
      </div>
      <div v-else-if="error" class="text-center">
        <p class="text-lg text-red-600">An error occurred while fetching data: {{ error }}</p>
      </div>
      <div v-else-if="headerServiceData">
        <h1 class="text-4xl lg:text-5xl font-bold text-ultify-blue mb-5">{{ headerServiceData.Title }}</h1>
        <p class="text-[#34495e] text-lg lg:text-xl leading-relaxed mb-8">{{ headerServiceData.Description }}</p>
        <div class="flex flex-wrap gap-4">
          <span v-for="pill in headerServiceData.Pill" :key="pill.id" class="bg-ultify-blue text-white px-4 py-2 rounded-full text-sm">
            {{ pill.Title }}
          </span>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-lg text-ultify-blue">No data available.</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useDataStore } from '@/stores'
import { storeToRefs } from 'pinia'

const props = defineProps<{
  serviceId: number
}>()

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const headerServiceData = ref(null)
const loading = ref(false)
const error = ref(null)

const fetchHeaderServiceData = async () => {
  loading.value = true
  error.value = null
  try {
    await dataStore.fetchHeaderServiceData(props.serviceId)
    headerServiceData.value = state.value.headerServiceData
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(fetchHeaderServiceData)

watch(() => props.serviceId, fetchHeaderServiceData)

defineExpose({ fetchHeaderServiceData })
</script>