import { defineEventHandler, getQuery } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const serviceId = query.id ? String(query.id) : '1' // Ensure serviceId is a string
  const cacheKey = `header-service-data-${serviceId}`

  let cachedData = await storage.getItem(cacheKey)

  if (!cachedData) {
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = `/api/header-services/${serviceId}`
    const populateQuery = '?populate=*'

    try {
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
        // Cache the data
        await storage.setItem(cacheKey, cachedData)
      }
    } catch (error) {
      console.error('Error fetching header service data:', error)
      console.error('Attempted to fetch from:', `${strapiUrl}${endpoint}${populateQuery}`)
    }
  }

  return cachedData || null
})