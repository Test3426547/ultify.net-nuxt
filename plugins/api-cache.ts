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
      cachedFetch: async (url: string) => {
        const now = Date.now()
        if (cache.has(url)) {
          const entry = cache.get(url)!
          if (now - entry.timestamp < cacheDuration) {
            return entry.data
          }
        }

        const data = await $fetch(url)
        cache.set(url, { data, timestamp: now })
        return data
      }
    }
  }
})