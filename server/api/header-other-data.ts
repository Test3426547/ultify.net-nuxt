// server/api/header-other-data.ts

import { defineEventHandler, createError, H3Event, getQuery } from 'h3'
import { useStorage } from 'nitropack'
import { $fetch } from 'ofetch'

const STRAPI_URL = process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com/api'
const CACHE_MAX_AGE = 60 * 60 * 3 // 3 hours in seconds

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event)
  const id = query.id ? Number(query.id) : 1

  // Validate id
  if (isNaN(id) || id < 1) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid id parameter'
    })
  }

  const storage = useStorage()
  const cacheKey = `header-other-${id}`

  try {
    // For SSG, always fetch fresh data
    if (process.server && !process.dev) {
      console.log(`Fetching fresh header-other data for id: ${id} during build`)
      const data = await $fetch(`${STRAPI_URL}/header-others/${id}?populate=*`)
      
      if (!data || !data.data) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Not Found',
          message: 'Header-other data not found'
        })
      }

      // Cache the response for SSR/ISR
      await storage.setItem(cacheKey, data, { ttl: CACHE_MAX_AGE })
      return data
    }

    // For SSR/ISR, check cache first
    const cachedData = await storage.getItem(cacheKey)
    if (cachedData) {
      console.log(`Serving cached data for header-other id: ${id}`)
      return cachedData
    }

    // Fetch from Strapi if not in cache
    console.log(`Fetching header-other data for id: ${id}`)
    const data = await $fetch(`${STRAPI_URL}/header-others/${id}?populate=*`)

    if (!data || !data.data) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Not Found',
        message: 'Header-other data not found'
      })
    }

    // Cache the response
    await storage.setItem(cacheKey, data, { ttl: CACHE_MAX_AGE })

    // Set cache control headers for SSR/ISR
    if (process.server) {
      event.node.res.setHeader('Cache-Control', `max-age=${CACHE_MAX_AGE}, s-maxage=${CACHE_MAX_AGE}, stale-while-revalidate=${CACHE_MAX_AGE * 2}`)
    }

    console.log(`Successfully fetched and cached header-other data for id: ${id}`)
    return data
  } catch (error) {
    console.error('Error in header-other-data API:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: `Failed to fetch header-other data: ${error.message}`
    })
  }
})