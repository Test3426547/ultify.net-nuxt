import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('service-details-api.log', `[Service Details API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const serviceId = query.id ? String(query.id) : '1'

    const storage = useStorage()
    const cacheKey = `service-details-${serviceId}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData) {
      logToFile('service-details-api.log', '[Service Details API] Data served from cache')
      return cachedData
    }

    logToFile('service-details-api.log', '[Service Details API] Cache miss, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = `/api/service-details/${serviceId}`
    const populateQuery = '?populate[ServiceDetails][populate]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('service-details-api.log', `[Service Details API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.attributes) {
      const serviceDetailsData = {
        id: data.data.id,
        ServiceDetails: data.data.attributes.ServiceDetails.map(service => ({
          id: service.id,
          Heading: service.Heading,
          Description: service.Description,
          Image: service.Image.data ? {
            url: service.Image.data.attributes.url,
            alternativeText: service.Image.data.attributes.alternativeText,
            formats: service.Image.data.attributes.formats
          } : null
        }))
      }
      
      // Cache the data
      await storage.setItem(cacheKey, serviceDetailsData)
      logToFile('service-details-api.log', `[Service Details API] Data fetched from Strapi and cached: ${JSON.stringify(serviceDetailsData, null, 2)}`)
      return serviceDetailsData
    } else {
      logToFile('service-details-api.log', '[Service Details API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('service-details-api.log', `[Service Details API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})