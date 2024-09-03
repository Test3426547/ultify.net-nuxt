import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'

export const useDataStore = defineStore('data', () => {
  // State
  const faqData = ref(null)
  const error = ref(null)
  const loading = ref({
    faq: false,
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(loading.value).some(val => val))

  // Actions
  function setData(key, data) {
    console.log(`Setting ${key} data:`, data)
    this[key] = data
  }

  function setError(err) {
    console.error('Error in data store:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key, isLoading) {
    console.log(`Setting ${key} loading state:`, isLoading)
    loading.value[key] = isLoading
  }

  async function fetchData(key, apiEndpoint) {
    setLoading(key, true)
    try {
      const { data } = await useAsyncData(key, () => $fetch(apiEndpoint))
      if (data.value) {
        setData(key, data.value)
        console.log(`${key} data fetched successfully`)
      } else {
        throw new Error(`No data returned for ${key}`)
      }
    } catch (err) {
      setError(err)
      console.error(`Error fetching ${key} data:`, err)
    } finally {
      setLoading(key, false)
    }
  }

  // Specific fetch functions for each component
  const fetchFAQData = () => fetchData('faqData', '/api/faq-data')

  return {
    // State
    faqData,
    error,
    loading,
    // Getters
    isAnyLoading,
    // Actions
    setData,
    setError,
    setLoading,
    fetchData,
    fetchFAQData,
  }
})