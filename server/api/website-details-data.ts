import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('website-details-api.log', `[Website Details API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'websiteDetailsData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('website-details-api.log', '[Website Details API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('website-details-api.log', '[Website Details API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/website-details'
    const populateQuery = '?populate[WebsiteDetails][populate]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('website-details-api.log', `[Website Details API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0 && data.data[0].attributes) {
      const websiteDetailsData = {
        id: data.data[0].id,
        WebsiteDetails: data.data[0].attributes.WebsiteDetails.map((detail: any) => ({
          id: detail.id,
          Heading: detail.Heading,
          Description: detail.Description,
          Image: detail.Image
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(websiteDetailsData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('website-details-api.log', `[Website Details API] Data fetched from Strapi and cached: ${JSON.stringify(websiteDetailsData, null, 2)}`)
      return websiteDetailsData
    } else {
      logToFile('website-details-api.log', '[Website Details API] No data found in API response')
      return null
    }
  } catch (error: unknown) {
    logToFile('website-details-api.log', `[Website Details API] Error: ${error}`)
    if (error instanceof Error && 'statusCode' in error) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})