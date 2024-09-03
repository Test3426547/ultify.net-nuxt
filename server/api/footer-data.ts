import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'

const CACHE_KEY = 'footer-data'
const CACHE_DURATION = 3600000 // 1 hour in milliseconds
let lastFetchTime = 0
const RATE_LIMIT_INTERVAL = 5000 // 5 seconds

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const lang = query.lang ? String(query.lang) : 'en' // Default to English
  const cacheKey = `${CACHE_KEY}-${lang}`
  const refresh = query.refresh === 'true'
  const now = Date.now()

  // Check cache
  let cachedData = refresh ? null : await storage.getItem(cacheKey)
  if (cachedData) {
    const { data, timestamp } = cachedData
    if (now - timestamp < CACHE_DURATION) {
      return data
    }
  }

  // Rate limiting
  if (now - lastFetchTime < RATE_LIMIT_INTERVAL) {
    const waitTime = RATE_LIMIT_INTERVAL - (now - lastFetchTime)
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }

  try {
    lastFetchTime = Date.now()
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/footers'
    const populateQuery = '?populate=*'

    console.log(`[log] Fetching footer data from: ${strapiUrl}${endpoint}${populateQuery}`)

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    
    console.log('[log] Raw footer data:', JSON.stringify(data, null, 2))

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const footerData = {
        id: data.data[0].id,
        Email: attributes.Email,
        Text: attributes.Text,
        Logo: {
          data: {
            attributes: {
              url: attributes.Logo.data?.attributes.url,
              alternativeText: attributes.Logo.data?.attributes.alternativeText
            }
          }
        },
        Link: attributes.Link.map(link => ({
          id: link.id,
          Text: link.Text,
          Link: link.Link
        })),
        Pill: attributes.Pill.map(pill => ({
          id: pill.id,
          Text: pill.Text,
          Link: pill.Link
        }))
      }
      
      // Cache the data
      await storage.setItem(cacheKey, { data: footerData, timestamp: now })

      console.log('[log] Footer Data:', JSON.stringify(footerData, null, 2))
      return footerData
    } else {
      console.warn('[warn] No footer data found in the API response')
      return null
    }
  } catch (error) {
    console.error('[error] Error in footer-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})