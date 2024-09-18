import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('content-creation-details-api.log', `[Content Creation Details API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'contentCreationDetailsData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('content-creation-details-api.log', '[Content Creation Details API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('content-creation-details-api.log', '[Content Creation Details API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/content-creation-details'
    const populateQuery = '?populate[ContentCreationDetails][populate]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('content-creation-details-api.log', `[Content Creation Details API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0 && data.data[0].attributes) {
      const contentCreationDetailsData = {
        id: data.data[0].id,
        ContentCreationDetails: data.data[0].attributes.ContentCreationDetails.map((detail: any) => ({
          id: detail.id,
          Heading: detail.Heading,
          Description: detail.Description,
          Image: detail.Image
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(contentCreationDetailsData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('content-creation-details-api.log', `[Content Creation Details API] Data fetched from Strapi and cached: ${JSON.stringify(contentCreationDetailsData, null, 2)}`)
      return contentCreationDetailsData
    } else {
      logToFile('content-creation-details-api.log', '[Content Creation Details API] No data found in API response')
      return null
    }
  } catch (error: unknown) {
    logToFile('content-creation-details-api.log', `[Content Creation Details API] Error: ${error}`)
    if (error instanceof Error && 'statusCode' in error) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})