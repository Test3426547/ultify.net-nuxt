import { defineEventHandler, createError, getQuery } from 'h3'
import { useStorage } from '#imports'
import { logToFile } from '~/utils/logger'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
  try {
    apiCallCount++
    logToFile('navbar-api.log', `[Navbar API] Call count: ${apiCallCount}`)

    const query = getQuery(event)
    const refresh = query.refresh === 'true'

    const storage = useStorage('kv')
    const cacheKey = 'navbarData'
    const cachedData = await storage.getItem(cacheKey)
    const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

    const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

    if (cachedData && cacheTimestamp && !refresh) {
      const currentTime = Date.now()
      if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
        logToFile('navbar-api.log', '[Navbar API] Data served from cache')
        return JSON.parse(cachedData as string)
      }
    }

    logToFile('navbar-api.log', '[Navbar API] Cache miss or expired, fetching from Strapi')
    const strapiUrl = 'https://backend.mcdonaldsz.com'
    const endpoint = '/api/navbars'
    const populateQuery = '?populate[Logo][populate]=*&populate[Page]=*&populate[Services]=*&populate[Placeholder]=*'

    const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
    if (!response.ok) {
      throw createError({
        statusCode: response.status,
        statusMessage: `HTTP error! status: ${response.status}`
      })
    }
    const data = await response.json()
    logToFile('navbar-api.log', `[Navbar API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)
    
    if (data.data && data.data.attributes) {
      const attributes = data.data.attributes
      const navbarData = {
        id: data.data.id,
        title: attributes.TItle || '', // Use empty string as fallback
        message: attributes.Message || '',
        button: attributes.Button || '',
        servicesText: attributes.Text || '',
        logo: attributes.Logo ? {
          id: attributes.Logo.id,
          link: attributes.Logo.Link || '',
          photo: attributes.Logo.Photo?.data?.attributes?.url || ''
        } : null,
        pages: Array.isArray(attributes.Page) ? attributes.Page.map((page: any) => ({
          id: page.id,
          text: page.Text || '',
          link: page.Link || ''
        })) : [],
        services: Array.isArray(attributes.Services) ? attributes.Services.map((service: any) => ({
          id: service.id,
          text: service.Text || '',
          link: service.Link || ''
        })) : [],
        placeholders: Array.isArray(attributes.Placeholder) ? attributes.Placeholder.map((placeholder: any) => ({
          id: placeholder.id,
          body: placeholder.Body || ''
        })) : []
      }
      
      await storage.setItem(cacheKey, JSON.stringify(navbarData))
      await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
      logToFile('navbar-api.log', `[Navbar API] Data fetched from Strapi and cached: ${JSON.stringify(navbarData, null, 2)}`)
      return navbarData
    } else {
      logToFile('navbar-api.log', '[Navbar API] No data found in API response')
      return null
    }
  } catch (error) {
    logToFile('navbar-api.log', `[Navbar API] Error: ${error}`)
    if (error.statusCode) {
      throw error // Re-throw createError errors
    }
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    })
  }
})