import { defineNuxtPlugin } from '#app'
import { useDataStore } from '~/stores'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  console.log('[Plugin] Starting initial data fetch')

  // Fetch data for all components
  await Promise.all([
    dataStore.fetchFAQData(),
  ])

  console.log('[Plugin] All initial data fetched and stored in Pinia')

  // You can add error handling here if needed
  if (dataStore.state.error) {
    console.error('[Plugin] Error occurred during initial data fetch:', dataStore.state.error)
  }

  // Check if any component is still loading
  if (dataStore.isAnyLoading) {
    console.warn('[Plugin] Some components are still loading data')
  } else {
    console.log('[Plugin] All components finished loading data')
  }

  console.log(`[Plugin] Total API calls made: ${dataStore.state.apiCallCount}`)
})