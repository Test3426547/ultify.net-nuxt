import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('our-dna-api.log', `[Our DNA API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash('our-dna-data')}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('our-dna-api.log', '[Our DNA API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('our-dna-api.log', '[Our DNA API] Cache miss or refresh requested, fetching from Strapi')
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
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(ourDnaData))
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