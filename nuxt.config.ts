export default defineNuxtConfig({
  // Static Site Generation mode
  target: 'static',
  // Server-Side Rendering mode
  ssr: true,

  // Global CSS files
  css: [
    '@/assets/css/theme.css',
    'bootstrap-icons/font/bootstrap-icons.css',
  ],

  // Import plugins
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/bootstrap.client.ts',
  ],

  // Application head settings
  app: {
    head: {
      titleTemplate: '%s | Ultify Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Ultify Solutions offers cutting-edge digital marketing services to boost your online presence and drive growth.' },
        { hid: 'og:title', property: 'og:title', content: 'Ultify Solutions - Digital Marketing Experts' },
        { hid: 'og:description', property: 'og:description', content: 'Boost your online presence with Ultify Solutions. We offer tailored digital marketing strategies for businesses of all sizes.' },
        { hid: 'og:image', property: 'og:image', content: 'https://www.ultifysolutions.com/og-image.jpg' },
        { hid: 'og:url', property: 'og:url', content: 'https://www.ultifysolutions.com' },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@ultifysolutions' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'theme-color', content: '#121212', media: '(prefers-color-scheme: dark)' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&display=swap' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css' },
      ],
      script: []
    }
  },

  // Nuxt modules
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/sitemap',
    '@pinia/nuxt',
  ],
  pinia: {
    autoImports: ['defineStore', 'storeToRefs'],
  },

  strapi: {
    url: process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com',
    token: process.env.STRAPI_TOKEN,
    prefix: '/api',
    admin: '/admin',
    version: 'v4',
    cookie: {},
    cookieName: 'strapi_jwt'
  },

  // Sitemap configuration
  sitemap: {
    hostname: 'https://mcdonaldsz.com',
    gzip: true,
    exclude: [
      '/admin/**'
    ],
    routes: async () => {
      const { $strapi } = useNuxtApp()
      
      // Static routes
      const staticRoutes = [
        '/',
        '/about-us',
        '/contact-us',
        '/consultation',
        '/services/website',
        '/services/social-media',
        '/services/seo',
        '/services/paid-media',
        '/services/content-creation',
        '/services/print-advertising'
      ]

      // Fetch dynamic routes from Strapi
      const fetchRoutes = async (contentType) => {
        try {
          const { data } = await $strapi.find(contentType, {
            fields: ['slug'],
            pagination: { limit: -1 }
          })
          return data.map(item => `/${contentType}/${item.attributes.slug}`)
        } catch (error) {
          console.error(`Error fetching ${contentType}:`, error)
          return []
        }
      }

      // Fetch all dynamic routes
      const blogRoutes = await fetchRoutes('posts')
      const caseStudyRoutes = await fetchRoutes('case-studies')
      const serviceRoutes = await fetchRoutes('services')

      // Combine all routes
      return [
        ...staticRoutes,
        ...blogRoutes,
        ...caseStudyRoutes,
        ...serviceRoutes
      ]
    },
    defaults: {
      changefreq: 'daily',
      priority: 0.7,
      lastmod: new Date()
    }
  },

  // Runtime configuration
  runtimeConfig: {
    public: {
      strapiURL: process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com',
      siteUrl: process.env.SITE_URL || 'https://mcdonaldsz.com',
      strapiBaseUrl: process.env.STRAPI_BASE_URL || 'https://backend.mcdonaldsz.com',
    },
  },

  // Nitro configuration
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      ignore: ['/admin']
    }
  },

  // Devtools settings
  devtools: { enabled: true },
  compatibilityDate: '2024-08-03',
  site: {
    url: 'https://mcdonaldsz.com', // Replace with your actual website URL
  },
  generate: {
    routes: [
      '/',
      '/social-media',
      '/about-us',
      '/contact-us',
      '/consultation',
      '/paid-media',
      '/seo',
      '/print-advertising',
      '/website',
      '/content-creation'
    ]
  },
})