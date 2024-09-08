import { defineNuxtPlugin, useFetch } from '#app'
import { useDataStore } from '@/stores/index'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()
  const key = 'footerData'
  const endpoint = '/api/footer-data'

  const fetchWithRetry = async (retries = 3, delay = 1000): Promise<any> => {
    for (let i = 0; i < retries; i++) {
      try {
        const { data, error } = await useFetch(endpoint, {
          key: `global-${endpoint}`,
          server: { maxAge: 10800 }
        })
        if (error.value) throw error.value
        return data.value
      } catch (err) {
        console.warn(`Attempt ${i + 1} failed for ${endpoint}. Retrying...`)
        if (i === retries - 1) throw err
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  const fetchData = async (): Promise<void> => {
    if (!dataStore.state[key]) {
      try {
        const data = await fetchWithRetry()
        if (data) {
          dataStore.setData(key, data)
        } else {
          throw new Error(`No data returned for ${key}`)
        }
      } catch (error) {
        console.error(`Error fetching ${key}:`, error)
        dataStore.setError(error as Error)
      }
    }
  }

  // Fetch data on plugin initialization
  await fetchData()

  // Provide a method to refresh the data
  nuxtApp.provide(`refresh${key}`, fetchData)
})