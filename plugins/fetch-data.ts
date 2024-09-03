import { defineNuxtPlugin } from '#app'
import { useDataStore } from '~/stores'
import { logToFile } from '~/utils/logger'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  logToFile('fetch-data-plugin.log', '[Plugin] Starting initial data fetch')

  const fetchAllData = async () => {
    try {
      await Promise.all([
        dataStore.fetchFAQData(),
        dataStore.fetchFooterData(),
        dataStore.fetchCTAData(),
        dataStore.fetchDigitalWorldData(),
      ])
      logToFile('fetch-data-plugin.log', '[Plugin] All data fetched and stored in Pinia')
    } catch (error) {
      logToFile('fetch-data-plugin.log', `[Plugin] Error occurred during data fetch: ${error}`)
      dataStore.setError(error)
    }
  }

  // Initial data fetch
  await fetchAllData()

  // Set up a hook for route changes to refresh data
  nuxtApp.hook('page:start', async () => {
    logToFile('fetch-data-plugin.log', '[Plugin] Route changed, refreshing all data')
    await fetchAllData()
  })

  // Check if any component is still loading
  if (dataStore.isAnyLoading) {
    logToFile('fetch-data-plugin.log', '[Plugin] Some components are still loading data')
  } else {
    logToFile('fetch-data-plugin.log', '[Plugin] All components finished loading data')
  }

  logToFile('fetch-data-plugin.log', `[Plugin] Total API calls made: ${dataStore.state.apiCallCount}`)
})