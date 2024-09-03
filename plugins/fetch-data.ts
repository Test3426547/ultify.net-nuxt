import { defineNuxtPlugin } from '#app'
import { useDataStore } from '~/stores'
import fs from 'fs'
import path from 'path'

const logToFile = (message: string) => {
  const logPath = path.join(process.cwd(), 'fetch-data-plugin.log')
  fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`)
}

export default defineNuxtPlugin(async (nuxtApp) => {
  const dataStore = useDataStore()

  logToFile('[Plugin] Starting initial data fetch')

  // Fetch data for all components
  await Promise.all([
    dataStore.fetchFAQData(),
  ])

  logToFile('[Plugin] All initial data fetched and stored in Pinia')

  // You can add error handling here if needed
  if (dataStore.state.error) {
    logToFile(`[Plugin] Error occurred during initial data fetch: ${dataStore.state.error}`)
  }

  // Check if any component is still loading
  if (dataStore.isAnyLoading) {
    logToFile('[Plugin] Some components are still loading data')
  } else {
    logToFile('[Plugin] All components finished loading data')
  }

  logToFile(`[Plugin] Total API calls made: ${dataStore.state.apiCallCount}`)
})