import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('qne-api.log', `[QNE API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash('qne-data')}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('qne-api.log', '[QNE API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('qne-api.log', '[QNE API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/qnes'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('qne-api.log', `[QNE API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0) {
      const item = data.data[0].attributes
      const qneData = {
        id: data.data[0].id,
        Title: item.Title,
        Text: item.Text,
        Link: item.Link,
        Body: item.Body || [],
        Image: item.Image?.data?.attributes?.url || null,
      }
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(qneData))
      logToFile('qne-api.log', `[QNE API] Data fetched from Strapi and cached: ${JSON.stringify(qneData, null, 2)}`)
      return qneData
    } else {
      logToFile('qne-api.log', '[QNE API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('qne-api.log', `[QNE API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})