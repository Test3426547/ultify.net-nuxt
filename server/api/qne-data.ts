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
      const populateQuery = '?populate=*'

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
            ...data.data.attributes,
            id: data.data.id,
            Image: data.data.attributes.Image?.data?.attributes?.url || null,
            // Assuming 'Link' is the repeatable component
            Link: data.data.attributes.Link?.map(item => ({
              id: item.id,
              Text: item.Text,
              Url: item.Url
            })) || []
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

    console.log('[log] QNE Data:', cachedData)
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