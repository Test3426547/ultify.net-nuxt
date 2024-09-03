import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('our-services-api.log', `[Our Services API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'ourServicesData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('our-services-api.log', '[Our Services API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('our-services-api.log', '[Our Services API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/our-services'
    const populateQuery = '?populate[ServiceCard][populate]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('our-services-api.log', `[Our Services API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const ourServicesData = {
        id: data.data[0].id,
        title: attributes.Title,
        subtitle: attributes.Subtitle,
        serviceCards: attributes.ServiceCard.map(card => ({
          id: card.id,
          heading: card.Heading,
          body: card.Body,
          link: card.Link,
          image: card.Image?.data?.attributes ? {
            url: card.Image.data.attributes.url,
            width: card.Image.data.attributes.width,
            height: card.Image.data.attributes.height,
            alternativeText: card.Image.data.attributes.alternativeText,
            formats: card.Image.data.attributes.formats
          } : null
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(ourServicesData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('our-services-api.log', `[Our Services API] Data fetched from Strapi and cached: ${JSON.stringify(ourServicesData, null, 2)}`)
      return ourServicesData
    } else {
      logToFile('our-services-api.log', '[Our Services API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('our-services-api.log', `[Our Services API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})