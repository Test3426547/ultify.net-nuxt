import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('website-header-api.log', `[Website Header API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'websiteHeaderData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('website-header-api.log', '[Website Header API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('website-header-api.log', '[Website Header API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/website-headers'
    const populateQuery = '?populate[Text][populate]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('website-header-api.log', `[Website Header API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0 && data.data[0].attributes) {
      const websiteHeaderData = {
        id: data.data[0].id,
        ...data.data[0].attributes,
        Text: data.data[0].attributes.Text?.map((text: { id: number; Title: string }) => ({
          id: text.id,
          Title: text.Title
        })) || []
      }
      
      await storage.setItem(cacheKey, JSON.stringify(websiteHeaderData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('website-header-api.log', `[Website Header API] Data fetched from Strapi and cached: ${JSON.stringify(websiteHeaderData, null, 2)}`)
      return websiteHeaderData
    } else {
      logToFile('website-header-api.log', '[Website Header API] No data found in API response')
      return null
    }
  } catch (error: unknown) {
    logToFile('website-header-api.log', `[Website Header API] Error: ${error}`)
    if (error instanceof Error && 'statusCode' in error) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})