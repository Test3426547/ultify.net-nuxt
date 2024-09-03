import { defineNuxtPlugin } from '#app'

interface CacheEntry {
  data: any
  timestamp: number
}

export default defineNuxtPlugin(() => {
    const cache = new Map<string, CacheEntry>()
    const cacheDuration = 5 * 60 * 1000 // 5 minutes in milliseconds
  
    return {
      provide: {
        cachedFetch: async () => {
          const cacheKey = 'componentData'
          const now = Date.now()
          if (cache.has(cacheKey)) {
            const entry = cache.get(cacheKey)!
            if (now - entry.timestamp < cacheDuration) {
              return entry.data
            }
          }
  
          const data = await $fetch('/api/component-data')
          cache.set(cacheKey, { data, timestamp: now })
          return data
        }
      }
    }
})