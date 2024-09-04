import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from 'nuxt-storage/server'
import { hash } from 'ohash'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('contact-form-api.log', `[Contact Form API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage()
    const cacheKey = `api-cache:${hash('contact-form-data')}`

    // Try to get data from cache
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData && !refresh) {
      logToFile('contact-form-api.log', '[Contact Form API] Data served from cache')
      try {
        return JSON.parse(cachedData)
      } catch (parseError) {
        logToFile('contact-form-api.log', `[Contact Form API] Error parsing cached data: ${parseError}`)
        // If parsing fails, continue to fetch fresh data
      }
    }

    logToFile('contact-form-api.log', '[Contact Form API] Cache miss or refresh requested, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/contact-forms'
    const populateQuery = '?populate=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    
    logToFile('contact-form-api.log', `[Contact Form API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const contactFormData = {
        id: data.data[0].id,
        Title: attributes.Title,
        Button: attributes.Button,
        Description: attributes.Description,
        Placeholder: attributes.Placeholder
      }
      
      // Cache the response
      await storage.setItem(cacheKey, JSON.stringify(contactFormData))
      logToFile('contact-form-api.log', `[Contact Form API] Data fetched from Strapi and cached: ${JSON.stringify(contactFormData, null, 2)}`)
      return contactFormData
    } else {
      logToFile('contact-form-api.log', '[Contact Form API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('contact-form-api.log', `[Contact Form API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})