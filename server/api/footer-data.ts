import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useNitroApp } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('footer-api.log', `[Footer API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'
    const lang = query.lang ? String(query.lang) : 'en' // Default to English

    const cacheKey = `footerData-${lang}`
    const nitroApp = useNitroApp()

    // Check if data is in cache
    if (!refresh) {
      const cachedData = await nitroApp.cache.get(cacheKey)
      if (cachedData) {
        logToFile('footer-api.log', '[Footer API] Data served from cache')
        return cachedData
      }
    }

    logToFile('footer-api.log', '[Footer API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com'
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

      // Cache the data for 3 hours (10800 seconds)
      await nitroApp.cache.set(cacheKey, footerData, { ttl: 10800 })
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