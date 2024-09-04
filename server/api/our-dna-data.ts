import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('our-dna-api.log', `[Our DNA API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'ourDnaData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('our-dna-api.log', '[Our DNA API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('our-dna-api.log', '[Our DNA API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/dnas'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('our-dna-api.log', `[Our DNA API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const ourDnaData = {
        id: data.data[0].id,
        title: attributes.Title,
        body: attributes.Body,
        readMore: attributes.ReadMore,
        image: attributes.Image.data
          ? {
              url: attributes.Image.data.attributes.url,
              alternativeText: attributes.Image.data.attributes.alternativeText
            }
          : null,
        showMore: false
      }
      
      await storage.setItem(cacheKey, JSON.stringify(ourDnaData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('our-dna-api.log', `[Our DNA API] Data fetched from Strapi and cached: ${JSON.stringify(ourDnaData, null, 2)}`)
      return ourDnaData
    } else {
      logToFile('our-dna-api.log', '[Our DNA API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('our-dna-api.log', `[Our DNA API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})