// plugins/shared-data.ts

import { defineNuxtPlugin, useFetch } from '#app'
import { useDataStore } from '@/stores/index'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  const sharedComponents = [
    { key: 'footerData', endpoint: '/api/footer-data' },
    { key: 'consultationData', endpoint: '/api/consultation-data' },
    { key: 'digitalWorldData', endpoint: '/api/digital-world-data' },
    { key: 'faqData', endpoint: '/api/faq-data' },
    { key: 'ctaData', endpoint: '/api/cta-data' },
  ]

  // Improved error handling and typing
  const fetchWithRetry = async (endpoint: string, retries = 3, delay = 1000): Promise<any> => {
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

  // Added error type and improved error handling
  const fetchComponentData = async (key: string, endpoint: string): Promise<void> => {
    if (!dataStore.state[key]) {
      try {
        const data = await fetchWithRetry(endpoint)
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

  // Use Promise.all for concurrent fetching with rate limiting
  const fetchAllData = async () => {
    const fetchPromises = sharedComponents.map(({ key, endpoint }) => 
      fetchComponentData(key, endpoint)
    )
    
    // Rate limit: fetch 3 at a time
    for (let i = 0; i < fetchPromises.length; i += 3) {
      await Promise.all(fetchPromises.slice(i, i + 3))
      // Add a small delay between batches
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }

  // Fetch all data on plugin initialization
  await fetchAllData()

  // Provide a method to refresh individual components
  nuxtApp.provide('refreshSharedData', async (key: string) => {
    const component = sharedComponents.find(c => c.key === key)
    if (component) {
      await fetchComponentData(component.key, component.endpoint)
    } else {
      console.warn(`No component found with key: ${key}`)
    }
  })
})