import { defineNuxtPlugin } from '#app'
import { useDataStore } from '~/stores'
import { logToFile } from '~/utils/logger'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  logToFile('fetch-data-plugin.log', '[Plugin] Starting initial data fetch')

  // Fetch data for all components
  await Promise.all([
    dataStore.fetchFAQData(),
  ])

  logToFile('fetch-data-plugin.log', '[Plugin] All initial data fetched and stored in Pinia')

  // You can add error handling here if needed
  if (dataStore.state.error) {
    logToFile('fetch-data-plugin.log', `[Plugin] Error occurred during initial data fetch: ${dataStore.state.error}`)
  }

  // Check if any component is still loading
  if (dataStore.isAnyLoading) {
    logToFile('fetch-data-plugin.log', '[Plugin] Some components are still loading data')
  } else {
    logToFile('fetch-data-plugin.log', '[Plugin] All components finished loading data')
  }

  logToFile('fetch-data-plugin.log', `[Plugin] Total API calls made: ${dataStore.state.apiCallCount}`)
})