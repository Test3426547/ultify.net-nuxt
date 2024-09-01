import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const cacheKey = 'our-services-data'
  const query = getQuery(event)
  const refresh = query.refresh === 'true'

  try {
    let cachedData = refresh ? null : await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = '/api/our-services'
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
        const attributes = data.data[0].attributes
        cachedData = {
          id: data.data[0].id,
          title: attributes.Title,
          subtitle: attributes.Subtitle,
          serviceCards: attributes.ServiceCard.map(card => ({
            id: card.id,
            heading: card.Heading,
            body: card.Body
          }))
        }
        
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn('No data found for Our Services')
      return null
    }

    console.log('[log] Our Services Data:', cachedData)
    return cachedData
  } catch (error) {
    console.error('Error in our-services-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})