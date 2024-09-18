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
    
    <SuspenseWrapper defaultFallback="Loading header...">
      <HeaderService :key="`header-${headerKey}`" :serviceId="serviceId" />
    </SuspenseWrapper>
    <SeoTechnologyLeft />
    <SeoTechnologyRight />
    <SuspenseWrapper defaultFallback="Loading Service Details...">
      <ServiceDetails :key="`header-${headerKey}`" :serviceId="serviceId" />
    </SuspenseWrapper>
    <SEOServices />
    <Consultation />
    <SuspenseWrapper defaultFallback="Loading Digital World...">
      <DigitalWorld />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading FAQ...">
      <FAQ />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading CTA...">
      <CTA />
    </SuspenseWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderService from '@/components/views/seo/Header.vue'
import SeoTechnologyLeft from '@/components/views/seo/SeoTechnologyLeft.vue'
import SeoTechnologyRight from '@/components/views/seo/SeoTechnologyRight.vue'
import ServiceDetails from '@/components/shared/ServiceDetails.vue'
import SEOServices from '@/components/views/seo/SEOServices.vue'
import Consultation from '@/components/shared/ConsultationForm.vue'
import DigitalWorld from '@/components/shared/DigitalWorld.vue'
import FAQ from '@/components/shared/FAQ.vue'
import CTA from '@/components/shared/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(3) // SEO service ID
const error = ref(null)
const serviceName = 'SEO'
const serviceSlug = 'seo'

// Add this ref to control the key of HeaderService
const headerKey = ref(0)

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

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    const pageData = await $fetch('/api/seo-page')
    if (pageData) {
      // ... (update meta and schema data as before)
      
      // Update the serviceId when page data is fetched
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in seo.vue:', err)
  error.value = err
  return true
})

// Remove the existing onMounted hook and commented out Strapi data fetching logic
</script>

<style scoped>
/* Additional styling specific to the SEO page */
</style>