import { defineEventHandler, getQuery, createError } from 'h3'
import { useState } from '#app'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  apiCallCount++
  console.log(`[FAQ API] Call count: ${apiCallCount}`)

  const cachedData = useState('faqData')
  const query = getQuery(event)
  const refresh = query.refresh === 'true'

  if (cachedData.value && !refresh) {
    console.log('[FAQ API] Data served from cache')
    return cachedData.value
  }

  try {
    console.log('[FAQ API] Cache miss, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/faqs'
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
      const item = data.data[0].attributes
      cachedData.value = {
        id: data.data[0].id,
        Title: item.Title,
        Subtitle: item.Subtitle,
        FAQ: item.FAQ || [],
      }
      console.log('[FAQ API] Data fetched from Strapi and cached')
    } else {
      console.warn('[FAQ API] No data found in API response')
      return null
    }

    return cachedData.value
  } catch (error) {
    console.error('[FAQ API] Error:', error)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})