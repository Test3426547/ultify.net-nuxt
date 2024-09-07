import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('service-selector-api.log', `[Service Selector API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'serviceSelectorData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('service-selector-api.log', '[Service Selector API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('service-selector-api.log', '[Service Selector API] Cache miss or expired, fetching from Strapi')
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
    logToFile('service-selector-api.log', `[Service Selector API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data[0] && data.data[0].attributes) {
      const serviceSelectorData = {
        title: data.data[0].attributes.Title,
        subtitle: data.data[0].attributes.Subtitle,
        serviceCards: data.data[0].attributes.ServiceCard.map(card => ({
          id: card.id,
          heading: card.Heading,
          body: card.Body,
          link: card.Link,
          image: card.Image.data ? {
            url: card.Image.data.attributes.url,
            alternativeText: card.Image.data.attributes.alternativeText
          } : null
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(serviceSelectorData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('service-selector-api.log', `[Service Selector API] Data fetched from Strapi and cached: ${JSON.stringify(serviceSelectorData, null, 2)}`)
      return serviceSelectorData
    } else {
      logToFile('service-selector-api.log', '[Service Selector API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('service-selector-api.log', `[Service Selector API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})