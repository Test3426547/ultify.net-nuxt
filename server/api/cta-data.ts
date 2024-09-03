import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'

const CACHE_KEY = 'cta-data'
const CACHE_DURATION = 3600000 // 1 hour in milliseconds
let lastFetchTime = 0
const RATE_LIMIT_INTERVAL = 5000 // 5 seconds

export default defineEventHandler(async (event) => {
  const storage = useStorage()
  const query = getQuery(event)
  const refresh = query.refresh === 'true'
  const now = Date.now()

  // Check cache
  let cachedData = refresh ? null : await storage.getItem(CACHE_KEY)
  if (cachedData) {
    const { data, timestamp } = cachedData
    if (now - timestamp < CACHE_DURATION) {
      return data
    }
  }

  // Rate limiting
  if (now - lastFetchTime < RATE_LIMIT_INTERVAL) {
    const waitTime = RATE_LIMIT_INTERVAL - (now - lastFetchTime)
    await new Promise(resolve => setTimeout(resolve, waitTime))
  }

  // Fetch data
  const strapiUrl = 'https://backend.mcdonaldsz.com'
  try {
    lastFetchTime = Date.now()
    const response = await fetch(`${strapiUrl}/api/ctas?populate=*`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    const ctaData = Array.isArray(data.data) && data.data.length > 0
      ? data.data[0].attributes
      : null

    // Cache the data
    await storage.setItem(CACHE_KEY, { data: ctaData, timestamp: now })

    return ctaData
  } catch (error) {
    console.error('Error fetching CTA data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})