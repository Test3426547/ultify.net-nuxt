import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const cacheKey = 'carousel-data'
  const query = getQuery(event)
  const refresh = query.refresh === 'true'

  try {
    let cachedData = refresh ? null : await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = '/api/carousels'
      const populateQuery = '?populate[Cards][populate]=*'

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
          text: attributes.Text,
          cards: attributes.Cards.map(card => ({
            id: card.id,
            link: card.Link,
            // In the cachedData assignment:
            image: card.Image?.data?.attributes ? {
            url: card.Image.data.attributes.url, // Remove strapiUrl concatenation
            name: card.Image.data.attributes.name,
            width: card.Image.data.attributes.width,
            height: card.Image.data.attributes.height,
            alternativeText: card.Image.data.attributes.alternativeText,
            formats: card.Image.data.attributes.formats
            } : null
          }))
        }
        
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn('No data found for Carousel')
      return null
    }

    console.log('[log] Carousel Data:', cachedData)
    return cachedData
  } catch (error) {
    console.error('Error in carousel-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})