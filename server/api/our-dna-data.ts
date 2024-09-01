import { defineEventHandler, createError } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const cacheKey = 'our-dna-data'

  try {
    let cachedData = await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = '/api/dnas'
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
          body: attributes.Body,
          readMore: attributes.ReadMore,
          image: attributes.Image.data
            ? {
                url: attributes.Image.data.attributes.url,
                alternativeText: attributes.Image.data.attributes.alternativeText
              }
            : null,
          showMore: false
        }
        
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn('No data found for Our DNA')
      return null
    }

    console.log('[log] Our DNA Data:', cachedData)
    return cachedData
  } catch (error) {
    console.error('Error in our-dna-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})