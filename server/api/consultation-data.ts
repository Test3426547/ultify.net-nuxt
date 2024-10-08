import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('consultation-api.log', `[Consultation API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cachedData = await storage.getItem('consultationData')
    const cacheTimestamp = await storage.getItem('consultationDataTimestamp')

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('consultation-api.log', '[Consultation API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('consultation-api.log', '[Consultation API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
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
      
      await storage.setItem('consultationData', JSON.stringify(consultationData))
      await storage.setItem('consultationDataTimestamp', Date.now().toString())
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