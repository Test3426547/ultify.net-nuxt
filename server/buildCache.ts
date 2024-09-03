// server/buildCache.ts
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

export async function primeCache() {
  const storage = useStorage('kv')
  const strapiUrl = 'https://backend.mcdonaldsz.com'
  const endpoint = '/api/faqs'
  const populateQuery = '?populate=*'

  try {
    logToFile('build-cache.log', '[Build Cache] Fetching FAQ data for build-time caching')
    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    
    if (data.data && data.data.length > 0) {
      const item = data.data[0].attributes
      const faqData = {
        id: data.data[0].id,
        Title: item.Title,
        Subtitle: item.Subtitle,
        FAQ: item.FAQ || [],
      }
      await storage.setItem('faqData', JSON.stringify(faqData))
      await storage.setItem('faqDataTimestamp', Date.now().toString())
      logToFile('build-cache.log', `[Build Cache] FAQ data cached for build: ${JSON.stringify(faqData, null, 2)}`)
    } else {
      logToFile('build-cache.log', '[Build Cache] No FAQ data found in API response')
    }
  } catch (error) {
    logToFile('build-cache.log', `[Build Cache] Error caching FAQ data: ${error}`)
  }
}
