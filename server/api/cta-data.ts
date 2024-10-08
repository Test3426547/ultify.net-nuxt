import { defineEventHandler, createError, getQuery } from 'h3'
import { logToFile } from '~/utils/logger'
import { useStorage } from '#imports'

let apiCallCount = 0

export default defineEventHandler(async (event) => {
	try {
		apiCallCount++
		logToFile('cta-api.log', `[CTA API] Call count: ${apiCallCount}`)

		const query = getQuery(event)
		const refresh = query.refresh === 'true'

		const storage = useStorage('kv')
		const cacheKey = 'ctaData'
		const cachedData = await storage.getItem(cacheKey)
		const cacheTimestamp = await storage.getItem(`${cacheKey}-timestamp`)

		const cacheExpiration = 60 * 60 * 1000 // 1 hour in milliseconds

		if (cachedData && cacheTimestamp && !refresh) {
			const currentTime = Date.now()
			if (currentTime - parseInt(cacheTimestamp as string) < cacheExpiration) {
				logToFile('cta-api.log', '[CTA API] Data served from cache')
				return JSON.parse(cachedData as string)
			}
		}

		logToFile('cta-api.log', '[CTA API] Cache miss or expired, fetching from Strapi')
		const strapiUrl = 'https://backend.mcdonaldsz.com'
		const endpoint = '/api/ctas'
		const populateQuery = '?populate=*'

		const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`)
		if (!response.ok) {
			throw createError({
				statusCode: response.status,
				statusMessage: `HTTP error! status: ${response.status}`
			})
		}
		const data = await response.json()
		
		logToFile('cta-api.log', `[CTA API] Raw data from Strapi: ${JSON.stringify(data, null, 2)}`)

		if (data.data && data.data.length > 0) {
			const attributes = data.data[0].attributes
			const ctaData = {
				id: data.data[0].id,
				Title: attributes.Title,
				Link: attributes.Link,
				Text: attributes.Text,
			}
			
			await storage.setItem(cacheKey, JSON.stringify(ctaData))
			await storage.setItem(`${cacheKey}-timestamp`, Date.now().toString())
			logToFile('cta-api.log', `[CTA API] Data fetched from Strapi and cached: ${JSON.stringify(ctaData, null, 2)}`)
			return ctaData
		} else {
			logToFile('cta-api.log', '[CTA API] No data found in API response')
			return null
		}
	} catch (error) {
		logToFile('cta-api.log', `[CTA API] Error: ${error}`)
		if (error.statusCode) {
			throw error // Re-throw createError errors
		}
		throw createError({
			statusCode: 500,
			statusMessage: 'Internal Server Error'
		})
	}
})