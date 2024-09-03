import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('footer-api.log', `[Footer API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'
    const lang = query.lang ? String(query.lang) : 'en' // Default to English

    const storage = useStorage('kv')
    const cacheKey = `footerData-${lang}`
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('footer-api.log', '[Footer API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('footer-api.log', '[Footer API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/footers'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    
    logToFile('footer-api.log', `[Footer API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const footerData = {
        id: data.data[0].id,
        Email: attributes.Email,
        Text: attributes.Text,
        Logo: {
          data: {
            attributes: {
              url: attributes.Logo.data?.attributes.url,
              alternativeText: attributes.Logo.data?.attributes.alternativeText
            }
          }
        },
        Link: attributes.Link.map(link => ({
          id: link.id,
          Text: link.Text,
          Link: link.Link
        })),
        Pill: attributes.Pill.map(pill => ({
          id: pill.id,
          Text: pill.Text,
          Link: pill.Link
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(footerData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('footer-api.log', `[Footer API] Data fetched from Strapi and cached: ${JSON.stringify(footerData, null, 2)}`)
      return footerData
    } else {
      logToFile('footer-api.log', '[Footer API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('footer-api.log', `[Footer API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})