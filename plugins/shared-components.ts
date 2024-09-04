import { defineNuxtPlugin, useFetch } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  const { data } = await useFetch('/api/shared-components', {
    key: 'shared-components',
    lazy: false,
    server: true,
    transform: (data) => {
      if (process.server) {
        nuxtApp.payload.sharedComponents = data
      }
      return data
    },
  })

  nuxtApp.provide('sharedComponents', data)
})