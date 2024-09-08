import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('service-technology-left-api.log', `[Service Technology Left API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'serviceTechnologyLeftData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('service-technology-left-api.log', '[Service Technology Left API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('service-technology-left-api.log', '[Service Technology Left API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/service-technology-lefts/1'
    const populateQuery = '?populate[Options][populate]=*&populate[Image]=*&populate[Points]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('service-technology-left-api.log', `[Service Technology Left API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.attributes) {
      const attributes = data.data.attributes
      const serviceTechnologyLeftData = {
        id: data.data.id,
        title: attributes.Title,
        subtitle: attributes.Subtitle,
        heading: attributes.Heading,
        body: attributes.Body,
        subheading: attributes.Subheading,
        image: attributes.Image.data
          ? {
              url: attributes.Image.data.attributes.url,
              alternativeText: attributes.Image.data.attributes.alternativeText
            }
          : null,
        options: attributes.Options.map((option: any) => ({
          id: option.id,
          heading: option.Heading,
          subheading: option.Subheading,
          body: option.Body,
          image: option.Image.data
            ? {
                url: option.Image.data.attributes.url,
                alternativeText: option.Image.data.attributes.alternativeText
              }
            : null,
          points: option.Points.map((point: any) => ({
            id: point.id,
            body: point.Body
          }))
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(serviceTechnologyLeftData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('service-technology-left-api.log', `[Service Technology Left API] Data fetched from Strapi and cached: ${JSON.stringify(serviceTechnologyLeftData, null, 2)}`)
      return serviceTechnologyLeftData
    } else {
      logToFile('service-technology-left-api.log', '[Service Technology Left API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('service-technology-left-api.log', `[Service Technology Left API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})