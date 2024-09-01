import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const lang = query.lang ? String(query.lang) : 'en' // Default to English
  const cacheKey = `footer-data-${lang}`
  const refresh = query.refresh === 'true'

  try {
    let cachedData = refresh ? null : await storage.getItem(cacheKey)

    if (!cachedData) {
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
      
      if (data.data && data.data.length > 0) {
        const attributes = data.data[0].attributes
        cachedData = {
          id: data.data[0].id,
          email: attributes.Email,
          text: attributes.Text,
          logo: attributes.Logo.data
            ? {
                url: attributes.Logo.data.attributes.url,
                alternativeText: attributes.Logo.data.attributes.alternativeText
              }
            : null,
          links: attributes.Link.map(link => ({
            id: link.id,
            text: link.Text,
            link: link.Link
          })),
          pills: attributes.Pill.map(pill => ({
            id: pill.id,
            text: pill.Text,
            link: pill.Link
          }))
        }
        
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn('No data found for Footer')
      return null
    }

    console.log('[log] Footer Data:', cachedData)
    return cachedData
  } catch (error) {
    console.error('Error in footer-data:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})