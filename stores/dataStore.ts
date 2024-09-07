import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch, UseFetchOptions } from '#app'
import { logToFile } from '../utils/logger'

export const useDataStore = defineStore('data', () => {
  const state = ref({
    headerServiceData: null,
    serviceDetailsData: null,
    error: null,
    loading: {
      headerService: false,
      serviceDetails: false,
    },
    apiCallCount: 0,
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(state.value.loading).some(val => val))

  // Actions
  function setData(key: string, data: any) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} data: ${JSON.stringify(data, null, 2)}`)
    state.value[key] = data
  }

  function setError(err: any) {
    logToFile('pinia-store.log', `[Pinia] Error in data store: ${err}`)
    state.value.error = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key: string, isLoading: boolean) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} loading state: ${isLoading}`)
    state.value.loading[key] = isLoading
  }

  async function fetchData(key: string, apiEndpoint: string, serviceId: number, options: UseFetchOptions = {}) {
    state.value.apiCallCount++
    logToFile('pinia-store.log', `[Pinia] API call count: ${state.value.apiCallCount}`)

    setLoading(key, true)
    setError(null) // Clear any previous errors

    try {
      logToFile('pinia-store.log', `[Pinia] Fetching data from ${apiEndpoint}`)
      const { data, error } = await useFetch(apiEndpoint, {
        key: `${key}-${serviceId}`,
        ...options,
        // ISR options
        cache: process.dev ? undefined : {
          maxAge: 60 * 180, // Cache for 3 hours
          staleMaxAge: 24 * 60 * 60, // Allow serving stale content for up to 24 hours
          swr: true, // Use stale-while-revalidate strategy
        },
      })

      if (error.value) {
        throw error.value
      }

      logToFile('pinia-store.log', `[Pinia] Raw data received: ${JSON.stringify(data.value, null, 2)}`)
      if (data.value) {
        setData(key, data.value)
        logToFile('pinia-store.log', `[Pinia] ${key} data fetched successfully: ${JSON.stringify(data.value, null, 2)}`)
      } else {
        logToFile('pinia-store.log', `[Pinia] No data returned for ${key}`)
        setData(key, null)
      }
    } catch (err) {
      setError(err)
      logToFile('pinia-store.log', `[Pinia] Error fetching ${key} data: ${err.message}\n${err.stack}`)
    } finally {
      setLoading(key, false)
    }
  }

  // Specific fetch functions for each component
  const fetchHeaderServiceData = async (serviceId: number, options: UseFetchOptions = {}) => 
    await fetchData('headerServiceData', `/api/header-service-data?id=${serviceId}`, serviceId, options)
  
  const fetchServiceDetailsData = async (serviceId: number, options: UseFetchOptions = {}) => 
    await fetchData('serviceDetailsData', `/api/service-details-data?id=${serviceId}`, serviceId, options)

  return {
    state,
    isAnyLoading,
    setData,
    setError,
    setLoading,
    fetchHeaderServiceData,
    fetchServiceDetailsData,
  }
})