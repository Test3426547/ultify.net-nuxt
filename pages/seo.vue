<template>
  <div>
    <SeoMeta 
      :title="metaTitle"
      :description="metaDescription"
      :ogImage="ogImage"
      :ogUrl="ogUrl"
      :canonicalUrl="canonicalUrl"
      :robots="robots"
    />
    <StructuredData type="Organization" :data="organizationSchema" />
    <StructuredData type="WebPage" :data="webPageSchema" />
    <StructuredData type="BreadcrumbList" :data="breadcrumbSchema" />
    <StructuredData type="Service" :data="serviceSchema" />
    
    <Suspense>
        <HeaderService :serviceId="serviceId" />
        <template #fallback>
          <div>Loading header...</div>
        </template>
    </Suspense>
    <SEOTechnology />
    <SEODetails />
    <SEOServices />
    <Consultation />
    <DigitalWorld />
    <FAQ />
    <CTA />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HeaderService from '@/components/HeaderService.vue'
import SEOTechnology from '@/components/SEOTechnology.vue'
import SEODetails from '@/components/SEODetails.vue'
import SEOServices from '@/components/SEOServices.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const serviceId = ref(3) // SEO service ID
const serviceName = 'SEO'
const serviceSlug = 'seo'

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Boost your website\'s visibility with Ultify Solutions\' expert SEO services. Improve rankings, increase organic traffic, and dominate search results.')
const ogImage = ref(`https://ultifysolutions.com/images/${serviceSlug}-services-og.jpg`)
const ogUrl = ref(`https://ultifysolutions.com/services/${serviceSlug}`)
const canonicalUrl = ref(`https://ultifysolutions.com/services/${serviceSlug}`)
const robots = ref('index, follow')

const organizationSchema = ref(createOrganizationSchema({
  name: 'Ultify Solutions',
  url: 'https://ultifysolutions.com',
  logo: 'https://ultifysolutions.com/logo.png',
  contactPoint: {
    telephone: '+61-2-1234-5678',
    contactType: 'customer service'
  },
  sameAs: [
    'https://www.facebook.com/UltifySolutions',
    'https://www.linkedin.com/company/ultify-solutions',
    'https://twitter.com/UltifySolutions'
  ]
}))

const webPageSchema = ref(createWebPageSchema({
  name: `${serviceName} Services | Ultify Solutions`,
  description: metaDescription.value,
  url: ogUrl.value
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: serviceName, url: ogUrl.value }
]))

const serviceSchema = ref(createServiceSchema({
  name: `${serviceName} Services`,
  description: 'Comprehensive SEO services to improve your website\'s visibility in search engines, increase organic traffic, and boost your online presence. We use cutting-edge techniques and tools to deliver measurable results.',
  provider: 'Ultify Solutions',
  serviceType: 'Search Engine Optimization',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  },
  offers: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'On-Page SEO' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Off-Page SEO' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Technical SEO' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Local SEO' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-commerce SEO' } }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SEO Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'SEO Techniques',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Keyword Research and Strategy' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Optimization' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Link Building' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Site Speed Optimization' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Audits and Reporting' } }
        ]
      }
    ]
  }
}))

// If you're planning to fetch data from Strapi in the future, you can add it here
// For example:
/*
import { useAsyncData } from '#app'

onMounted(async () => {
  const { data: pageData, error } = await useAsyncData(
    'seo-page',
    () => $fetch(`/api/${serviceSlug}-page`)
  )

  if (error.value) {
    console.error('Error fetching page data:', error.value)
  } else if (pageData.value) {
    metaTitle.value = pageData.value.metaTitle || metaTitle.value
    metaDescription.value = pageData.value.metaDescription || metaDescription.value
    ogImage.value = pageData.value.ogImage || ogImage.value
    ogUrl.value = pageData.value.ogUrl || ogUrl.value
    canonicalUrl.value = pageData.value.canonicalUrl || canonicalUrl.value
    robots.value = pageData.value.robots || robots.value
    
    // Update schema data
    webPageSchema.value = createWebPageSchema({
      name: pageData.value.title || webPageSchema.value.name,
      description: pageData.value.description || webPageSchema.value.description,
      url: webPageSchema.value.url
    })

    serviceSchema.value = createServiceSchema({
      name: pageData.value.serviceName || serviceSchema.value.name,
      description: pageData.value.serviceDescription || serviceSchema.value.description,
      provider: serviceSchema.value.provider,
      serviceType: pageData.value.serviceType || serviceSchema.value.serviceType,
      areaServed: serviceSchema.value.areaServed,
      availableChannel: serviceSchema.value.availableChannel,
      offers: pageData.value.offers || serviceSchema.value.offers,
      hasOfferCatalog: pageData.value.hasOfferCatalog || serviceSchema.value.hasOfferCatalog
    })

    if (pageData.value.faq) {
      faqSchema.value = {
        mainEntity: pageData.value.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
    }
  }
})
*/
</script>

<style scoped>
/* Additional styling specific to the SEO page */
</style>