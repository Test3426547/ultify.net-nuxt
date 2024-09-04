import { defineNuxtPlugin, useRuntimeConfig } from '#app'
import { hash } from 'ohash'
import { useStorage } from 'nuxt-storage/server'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const storage = useStorage()

  nuxtApp.hooks.hook('app:created', () => {
    const originalFetch = globalThis.$fetch

    globalThis.$fetch = async (request, options) => {
      // Only cache GET requests
      if (options?.method && options.method !== 'GET') {
        return originalFetch(request, options)
      }

      // Generate a unique cache key
      const key = hash(request + JSON.stringify(options))

      // Try to get cached data
      const cached = await storage.getItem(`api-cache:${key}`)
      if (cached) {
        return JSON.parse(cached)
      }

      // If not cached, make the API call
      const response = await originalFetch(request, options)

      // Cache the response
      await storage.setItem(`api-cache:${key}`, JSON.stringify(response))

      return response
    }
  })
})