import Strapi from 'strapi-sdk-js'

export function useStrapi() {
  const runtimeConfig = useRuntimeConfig()
  return new Strapi({
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