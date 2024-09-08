import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('consultation-hero-api.log', `[Consultation Hero API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'consultationHeroData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('consultation-hero-api.log', '[Consultation Hero API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('consultation-hero-api.log', '[Consultation Hero API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/guarantees'
    const populateQuery = '?populate[Guarantees][populate]=*&populate[Image]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('consultation-hero-api.log', `[Consultation Hero API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data[0] && data.data[0].attributes) {
      const consultationHeroData = {
        title: data.data[0].attributes.Title,
        image: data.data[0].attributes.Image.data ? {
          url: data.data[0].attributes.Image.data.attributes.url,
          alternativeText: data.data[0].attributes.Image.data.attributes.alternativeText
        } : null,
        guarantees: data.data[0].attributes.Guarantees.map(guarantee => ({
          id: guarantee.id,
          heading: guarantee.Heading,
          body: guarantee.Body
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(consultationHeroData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('consultation-hero-api.log', `[Consultation Hero API] Data fetched from Strapi and cached: ${JSON.stringify(consultationHeroData, null, 2)}`)
      return consultationHeroData
    } else {
      logToFile('consultation-hero-api.log', '[Consultation Hero API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('consultation-hero-api.log', `[Consultation Hero API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})