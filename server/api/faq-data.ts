import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const refresh = query.refresh === 'true'
  const cacheKey = 'faq-data'

  try {
    let cachedData = refresh ? null : await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = '/api/faqs'
      const populateQuery = '?populate=*'

      const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
      if (!response.ok) {
        throw createError({
          statusCode: response.status,
          statusMessage: `HTTP error! status: ${response.status}`
        })
      }
      const data = await response.json()
      
      if (data.data && data.data.length > 0) {
        const item = data.data[0].attributes
        cachedData = {
          id: data.data[0].id,
          Title: item.Title,
          Subtitle: item.Subtitle,
          FAQ: item.FAQ || [],
        }
        await storage.setItem(cacheKey, cachedData)
      } else {
        console.warn('No data found in API response')
        return null
      }
    }

    if (!cachedData) {
      console.warn('No data found for FAQ')
      return null
    }

    console.log('[log] FAQ Data:', cachedData)
    return cachedData
  } catch (error) {
    console.error('Error in faq-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})