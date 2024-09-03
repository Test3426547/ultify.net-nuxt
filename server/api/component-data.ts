import { defineEventHandler } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const cacheKey = 'all-component-data'
  let cachedData = await storage.getItem(cacheKey)

  if (!cachedData) {
    // Fetch all the data for different components
    const footerData = await $fetch('/api/footer-data')
    const faqData = await $fetch('/api/faq-data')
    const ctaData = await $fetch('/api/cta-data')

    cachedData = {
      footerData,
      faqData,
      ctaData,
    }

    // Cache the combined data
    await storage.setItem(cacheKey, cachedData)
  }

  return cachedData
})