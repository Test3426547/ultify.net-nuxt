import Strapi from 'strapi-sdk-js'

let strapiInstance: Strapi | null = null

export function useStrapi() {
  if (!strapiInstance) {
    const runtimeConfig = useRuntimeConfig()
    strapiInstance = new Strapi({
      url: runtimeConfig.public.strapiUrl,
      prefix: '/api',
      store: {
        key: 'strapi_jwt',
        useLocalStorage: false,
        cookieOptions: { path: '/' }
      },
      axiosOptions: {}
    })
  }
  return strapiInstance
}