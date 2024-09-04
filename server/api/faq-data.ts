import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from '#imports'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('faq-api.log', `[FAQ API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash('faq-data')}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('faq-api.log', '[FAQ API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('faq-api.log', '[FAQ API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
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
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(faqData))
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