import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from '#imports'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('header-api.log', `[Header API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash('header-data')}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('header-api.log', '[Header API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('header-api.log', '[Header API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/headers'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('header-api.log', `[Header API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const headerData = {
        id: data.data[0].id,
        Title: attributes.Title,
        Subtitle: attributes.Subtitle,
        Heading: attributes.Heading,
        Subheading: attributes.Subheading,
        Link: attributes.Link?.map(link => ({
          id: link.id,
          Text: link.Text,
          Link: link.Link
        })) || []
      }
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(headerData))
      logToFile('header-api.log', `[Header API] Data fetched from Strapi and cached: ${JSON.stringify(headerData, null, 2)}`)
      return headerData
    } else {
      logToFile('header-api.log', '[Header API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('header-api.log', `[Header API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})