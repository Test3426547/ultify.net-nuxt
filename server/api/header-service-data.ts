import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('header-service-api.log', `[Header Service API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const serviceId = query.id ? String(query.id) : '1'
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = `headerServiceData-${serviceId}`
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('header-service-api.log', '[Header Service API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('header-service-api.log', '[Header Service API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = `/api/header-services/${serviceId}`
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('header-service-api.log', `[Header Service API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.attributes) {
      const headerServiceData = {
        id: data.data.id,
        ...data.data.attributes,
        Pill: data.data.attributes.Pill?.map(pill => ({
          id: pill.id,
          Title: pill.Title
        })) || []
      }
      
      await storage.setItem(cacheKey, JSON.stringify(headerServiceData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('header-service-api.log', `[Header Service API] Data fetched from Strapi and cached: ${JSON.stringify(headerServiceData, null, 2)}`)
      return headerServiceData
    } else {
      logToFile('header-service-api.log', '[Header Service API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('header-service-api.log', `[Header Service API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})