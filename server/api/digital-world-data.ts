import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useNitroApp } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('digital-world-api.log', `[Digital World API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const cacheKey = 'digitalWorldData'
    const nitroApp = useNitroApp()

    // Check if data is in cache
    if (!refresh) {
      const cachedData = await nitroApp.cache.get(cacheKey)
      if (cachedData) {
        logToFile('digital-world-api.log', '[Digital World API] Data served from cache')
        return cachedData
      }
    }

    logToFile('digital-world-api.log', '[Digital World API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/digital-worlds'
    const populateQuery = '?populate[Address][populate]=*&populate=Image'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()

    logToFile('digital-world-api.log', `[Digital World API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const digitalWorldData = {
        id: data.data[0].id,
        Title: attributes.Title,
        Address: attributes.Address,
        Image: attributes.Image.data.attributes,
      }

      // Cache the data for 3 hours (10800 seconds)
      await nitroApp.cache.set(cacheKey, digitalWorldData, { ttl: 10800 })
      logToFile('digital-world-api.log', `[Digital World API] Data fetched from Strapi and cached: ${JSON.stringify(digitalWorldData, null, 2)}`)
      return digitalWorldData
    } else {
      logToFile('digital-world-api.log', '[Digital World API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('digital-world-api.log', `[Digital World API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})