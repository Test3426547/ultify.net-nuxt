import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { hash } from 'ohash'
import { logToFile } from '~/utils/logger'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const cacheKey = `api-cache:${hash('carousel-data')}`
  const query = getQuery(event)
  const refresh = query.refresh === 'true'

  try {
    let cachedData = refresh ? null : await storage.getItem(cacheKey)

    if (cachedData) {
      logToFile('carousel-api.log', '[Carousel API] Data served from cache')
      return JSON.parse(cachedData)
    }

    logToFile('carousel-api.log', '[Carousel API] Cache miss or refresh requested, fetching from Strapi')
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
    logToFile('carousel-api.log', `[Carousel API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

    if (data.data && data.data.length > 0) {
      const attributes = data.data[0].attributes
      const carouselData = {
        id: data.data[0].id,
        title: attributes.Title,
        text: attributes.Text,
        cards: attributes.Cards.map(card => ({
          id: card.id,
          link: card.Link,
          image: card.Image?.data?.attributes ? {
            url: card.Image.data.attributes.url,
            name: card.Image.data.attributes.name,
            width: card.Image.data.attributes.width,
            height: card.Image.data.attributes.height,
            alternativeText: card.Image.data.attributes.alternativeText,
            formats: card.Image.data.attributes.formats
          } : null
        }))
      }
      
      await storage.setItem(cacheKey, JSON.stringify(carouselData))
      logToFile('carousel-api.log', `[Carousel API] Data fetched from Strapi and cached: ${JSON.stringify(carouselData, null, 2)}`)
      return carouselData
    }

    logToFile('carousel-api.log', '[Carousel API] No data found for Carousel')
    return null
  } catch (error) {
    logToFile('carousel-api.log', `[Carousel API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})