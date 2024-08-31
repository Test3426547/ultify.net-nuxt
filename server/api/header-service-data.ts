import { defineEventHandler, getQuery, createError } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const serviceId = query.id ? String(query.id) : '1'
  const cacheKey = `header-service-data-${serviceId}`

  try {
    let cachedData = await storage.getItem(cacheKey)

    if (!cachedData) {
      const strapiUrl = 'https://backend.mcdonaldsz.com'
      const endpoint = `/api/header-services/${serviceId}`
      const populateQuery = '?populate=*'

      const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      cachedData = data.data && data.data.attributes
        ? {
            ...data.data.attributes,
            id: data.data.id
          }
        : null
      
      if (cachedData) {
        await storage.setItem(cacheKey, cachedData)
      }
    }

    if (!cachedData) {
      console.warn(`No data found for service ID: ${serviceId}`)
      return null // Return null instead of throwing an error
    }

    return cachedData
  } catch (error) {
    console.error('Error in header-service-data:', error)
    // Return null or a default object instead of throwing an error
    return null
  }
})