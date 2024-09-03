import { defineNitroConfig } from 'nitropack'

export default defineNitroConfig({
  storage: {
    kv: {
      driver: 'redis',
      clientOptions: {
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      },
    },
  },
})