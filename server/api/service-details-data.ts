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
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = `serviceDetailsData-${serviceId}`
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('service-details-api.log', '[Service Details API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('service-details-api.log', '[Service Details API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = `/api/service-details/${serviceId}`
    const populateQuery = '?populate=*'

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
        ...data.data.attributes,
        ServiceDetails: data.data.attributes.ServiceDetails || []
      }
      
      await storage.setItem(cacheKey, JSON.stringify(serviceDetailsData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
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