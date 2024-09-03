// server/buildCache.ts
import fs from 'fs'
import path from 'path'

const CACHE_FILE = path.join(process.cwd(), '.nuxt', 'faq-cache.json')

function log(message: string) {
  console.log(`[Build Cache] ${message}`)
}

export async function primeCache() {
  const strapiUrl = 'https://backend.mcdonaldsz.com'
  const endpoint = '/api/faqs'
  const populateQuery = '?populate=*'

  try {
    log('Fetching FAQ data for build-time caching')
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
      
      // Ensure the .nuxt directory exists
      fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true })
      
      // Write the cache file
      fs.writeFileSync(CACHE_FILE, JSON.stringify({
        data: faqData,
        timestamp: Date.now()
      }))
      
      log(`FAQ data cached for build: ${JSON.stringify(faqData, null, 2)}`)
    } else {
      log('No FAQ data found in API response')
    }
  } catch (error) {
    log(`Error caching FAQ data: ${error}`)
  }
}