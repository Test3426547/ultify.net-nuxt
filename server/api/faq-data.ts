import { defineEventHandler, getQuery, createError } from 'h3'
import fs from 'fs'
import path from 'path'

let apiCallCount = 0
const cache = new Map()

const logToFile = (message: string) => {
  const logPath = path.join(process.cwd(), 'faq-api.log')
  fs.appendFileSync(logPath, `${new Date().toISOString()} - ${message}\n`)
}

export default defineEventHandler(async (event) => {
  apiCallCount++
  logToFile(`[FAQ API] Call count: ${apiCallCount}`)

  const query = getQuery(event)
  const refresh = query.refresh === 'true'

  if (cache.has('faqData') && !refresh) {
    logToFile('[FAQ API] Data served from cache')
    return cache.get('faqData')
  }

  try {
    logToFile('[FAQ API] Cache miss, fetching from Strapi')
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
    logToFile(`[FAQ API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.length > 0) {
      const item = data.data[0].attributes
      const faqData = {
        id: data.data[0].id,
        Title: item.Title,
        Subtitle: item.Subtitle,
        FAQ: item.FAQ || [],
      }
      cache.set('faqData', faqData)
      logToFile(`[FAQ API] Data fetched from Strapi and cached: ${JSON.stringify(faqData, null, 2)}`)
      return faqData
    } else {
      logToFile('[FAQ API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile(`[FAQ API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})