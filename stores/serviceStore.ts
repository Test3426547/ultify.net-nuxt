import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useDataStore } from './dataStore'

export const useServiceStore = defineStore('service', () => {
  const dataStore = useDataStore()
  
  const currentServiceId = ref<number | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const setCurrentServiceId = (id: number) => {
    currentServiceId.value = id
  }

  const fetchServiceData = async (id: number) => {
    loading.value = true
    error.value = null

    try {
      const [detailsData, headerData] = await Promise.all([
        dataStore.fetchServiceDetailsData(id),
        dataStore.fetchHeaderServiceData(id)
      ])
      currentServiceId.value = id
      return { detailsData, headerData }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An error occurred'
      console.error('Error fetching service data:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  const currentServiceDetails = computed(() => dataStore.state.serviceDetailsData)
  const currentHeaderService = computed(() => dataStore.state.headerServiceData)

  const isLoading = computed(() => loading.value || dataStore.state.loading.serviceDetails || dataStore.state.loading.headerService)

  const hasError = computed(() => error.value !== null || dataStore.state.error !== null)

  return {
    currentServiceId,
    loading,
    error,
    setCurrentServiceId,
    fetchServiceData,
    currentServiceDetails,
    currentHeaderService,
    isLoading,
    hasError,
  }
})