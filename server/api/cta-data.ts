import { defineEventHandler } from 'h3'
import { useStorage } from '#imports'

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  let cachedData = await storage.getItem('cta-data')

  if (!cachedData) {
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    try {
      const response = await fetch(`${strapiUrl}/api/ctas?populate=*`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      cachedData = Array.isArray(data.data) && data.data.length > 0
        ? data.data[0].attributes
        : null
      
      // Cache the data
      await storage.setItem('cta-data', cachedData)
    } catch (error) {
      console.error('Error fetching CTA data:', error)
      console.error('Attempted to fetch from:', `${strapiUrl}/api/ctas?populate=*`)
      return null
    }
  }

  return cachedData
})