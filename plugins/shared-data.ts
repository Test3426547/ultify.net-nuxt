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

  const fetchWithRetry = async (endpoint: string, retries = 3, delay = 1000) => {
    for (let i = 0; i < retries; i++) {
      try {
        const { data, error } = await useFetch(endpoint, {
          key: `global-${endpoint}`,
          server: { maxAge: 10800 }
        })
        if (error.value) throw error.value
        return data.value
      } catch (err) {
        if (i === retries - 1) throw err
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }
  }

  const fetchComponentData = async (key: string, endpoint: string) => {
    if (!dataStore.state[key]) {
      try {
        const data = await fetchWithRetry(endpoint)
        if (data) {
          dataStore.setData(key, data)
        }
      } catch (error) {
        console.error(`Error fetching ${key}:`, error)
        dataStore.setError(error)
      }
    }
  }

  // Staggered fetching
  for (const { key, endpoint } of sharedComponents) {
    await fetchComponentData(key, endpoint)
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 200))
  }

  nuxtApp.provide('refreshSharedData', async (key: string) => {
    const component = sharedComponents.find(c => c.key === key)
    if (component) {
      await fetchComponentData(component.key, component.endpoint)
    }
  })
})