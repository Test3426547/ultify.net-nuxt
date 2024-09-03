import { defineNuxtPlugin } from '#app'
import { useDataStore } from '~/stores'

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  // Fetch data for all components
  await Promise.all([
    dataStore.fetchFAQData(),
  ])

  // Log the completion of data fetching
  console.log('All initial data fetched and stored in Pinia')

  // You can add error handling here if needed
  if (dataStore.error) {
    console.error('Error occurred during initial data fetch:', dataStore.error)
  }

  // Check if any component is still loading
  if (dataStore.isAnyLoading) {
    console.warn('Some components are still loading data')
  } else {
    console.log('All components finished loading data')
  }
})