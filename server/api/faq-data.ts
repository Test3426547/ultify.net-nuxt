import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useNitroApp } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('faq-api.log', `[FAQ API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const cacheKey = 'faqData'
    const nitroApp = useNitroApp()

    // Check if data is in cache
    if (!refresh) {
      const cachedData = await nitroApp.cache.get(cacheKey)
      if (cachedData) {
        logToFile('faq-api.log', '[FAQ API] Data served from cache')
        return cachedData
      }
    }

    logToFile('faq-api.log', '[FAQ API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/faqs'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('faq-api.log', `[FAQ API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const item = data.data[0].attributes
      const faqData = {
        id: data.data[0].id,
        Title: item.Title,
        Subtitle: item.Subtitle,
        FAQ: item.FAQ || [],
      }

      // Cache the data for 3 hours (10800 seconds)
      await nitroApp.cache.set(cacheKey, faqData, { ttl: 10800 })
      logToFile('faq-api.log', `[FAQ API] Data fetched from Strapi and cached: ${JSON.stringify(faqData, null, 2)}`)
      return faqData
    } else {
      logToFile('faq-api.log', '[FAQ API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('faq-api.log', `[FAQ API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})