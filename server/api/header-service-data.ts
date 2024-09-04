import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from 'nuxt-storage/server'
import { logToFile } from '~/utils/logger'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('header-service-api.log', `[Header Service API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const serviceId = query.id ? String(query.id) : '1'
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash(`header-service-${serviceId}`)}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('header-service-api.log', '[Header Service API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('header-service-api.log', '[Header Service API] Cache miss or refresh requested, fetching from Strapi')
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
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(headerServiceData))
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