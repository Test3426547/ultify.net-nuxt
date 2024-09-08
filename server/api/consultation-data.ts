import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useNitroApp } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('consultation-api.log', `[Consultation API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const cacheKey = 'consultationData'
    const nitroApp = useNitroApp()

    // Check if data is in cache
    if (!refresh) {
      const cachedData = await nitroApp.cache.get(cacheKey)
      if (cachedData) {
        logToFile('consultation-api.log', '[Consultation API] Data served from cache')
        return cachedData
      }
    }

    logToFile('consultation-api.log', '[Consultation API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/consultations'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()

    logToFile('consultation-api.log', `[Consultation API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const consultationData = {
        id: data.data[0].id,
        Title: attributes.Title,
        Description: attributes.Description,
        Button: attributes.Button,
        Image: {
          url: attributes.Image.data.attributes.url,
          alternativeText: attributes.Image.data.attributes.alternativeText
        },
        Field: attributes.Field
      }

      // Cache the data for 3 hours (10800 seconds)
      await nitroApp.cache.set(cacheKey, consultationData, { ttl: 10800 })
      logToFile('consultation-api.log', `[Consultation API] Data fetched from Strapi and cached: ${JSON.stringify(consultationData, null, 2)}`)
      return consultationData
    } else {
      logToFile('consultation-api.log', '[Consultation API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('consultation-api.log', `[Consultation API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})