import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLazyAsyncData } from '#app'

export const useDataStore = defineStore('data', () => {
  // State
  const state = ref({
    faqData: null,
    error: null,
    loading: {
      faq: false,
    },
    apiCallCount: 0
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(state.value.loading).some(val => val))

  // Actions
  function setData(key, data) {
    console.log(`[Pinia] Setting ${key} data:`, data)
    state.value[key] = data
  }

  function setError(err) {
    console.error('[Pinia] Error in data store:', err)
    state.value.error = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key, isLoading) {
    console.log(`[Pinia] Setting ${key} loading state:`, isLoading)
    state.value.loading[key] = isLoading
  }

  async function fetchData(key, apiEndpoint) {
    if (state.value[key]) {
      console.log(`[Pinia] Data for ${key} already exists, skipping fetch`)
      return
    }

    state.value.apiCallCount++
    console.log(`[Pinia] API call count: ${state.value.apiCallCount}`)

    setLoading(key, true)
    try {
      const { data } = await useLazyAsyncData(key, () => $fetch(apiEndpoint), {
        server: false,
        lazy: true,
        default: () => null,
      })
      if (data.value) {
        setData(key, data.value)
        console.log(`[Pinia] ${key} data fetched successfully`)
      } else {
        console.warn(`[Pinia] No data returned for ${key}`)
        setData(key, null)
      }
    } catch (err) {
      setError(err)
      console.error(`[Pinia] Error fetching ${key} data:`, err)
    } finally {
      setLoading(key, false)
    }
  }

  // Specific fetch functions for each component
  const fetchFAQData = () => fetchData('faqData', '/api/faq-data')

  return {
    state,
    isAnyLoading,
    setData,
    setError,
    setLoading,
    fetchData,
    fetchFAQData,
  }
})