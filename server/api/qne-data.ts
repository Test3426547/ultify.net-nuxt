import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const lang = query.lang ? String(query.lang) : 'en' // Default to English
  const cacheKey = `qne-data-${lang}`

  try {
    let cachedData = await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = '/api/qnes'
      const populateQuery = `?populate=*`

      const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage: `HTTP error! status: ${response.status}`
        })
      }
      const data = await response.json()
      cachedData = data.data && data.data.attributes
        ? {
            Title: data.data.attributes.Title,
            Body: data.data.attributes.Body,
            Link: data.data.attributes.Link,
            Text: data.data.attributes.Text,
            Image: data.data.attributes.Image.data.attributes,
            id: data.data.id
          }
        : null
      
      if (cachedData) {
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn('No data found for Quick n Easy')
      return null
    }

    return cachedData
  } catch (error) {
    console.error('Error in qne-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})