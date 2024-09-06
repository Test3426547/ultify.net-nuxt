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
      <HeaderService :key="$route.fullPath" :serviceId="serviceId" />
    </SuspenseWrapper>
    <PrintAdvertisingBlog />
    <SuspenseWrapper defaultFallback="Loading Service Details...">
      <ServiceDetails :key="$route.fullPath" :serviceId="serviceId" />
    </SuspenseWrapper>
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
import { ref, onMounted, watch, useAsyncData } from '#imports'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores/index'
import { useServiceStore } from '@/stores/serviceStore'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

// Components
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderService from '@/components/HeaderService.vue'
import PrintAdvertisingBlog from '@/components/PrintAdvertisingBlog.vue'
import ServiceDetails from '@/components/ServiceDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'

// Route and router
const route = useRoute()
const router = useRouter()

// Stores
const dataStore = useDataStore()
const serviceStore = useServiceStore()
const { currentServiceDetails, currentHeaderService } = storeToRefs(serviceStore)

// Service-specific data
const serviceId = ref(6) // ID for Print Advertising service
const serviceName = ref('Print Advertising')
const serviceSlug = ref('print-advertising')

// Component keys for forcing re-render
const headerKey = ref(0)
const serviceDetailsKey = ref(0)

// SEO and meta data
const metaTitle = ref(`${serviceName.value} Services | Ultify Solutions`)
const metaDescription = ref('Elevate your brand with Ultify Solutions\' expert print advertising services. Create impactful print campaigns that resonate with your target audience.')
const ogImage = ref(`https://ultifysolutions.com/images/${serviceSlug.value}-og.jpg`)
const ogUrl = ref(`https://ultifysolutions.com/services/${serviceSlug.value}`)
const canonicalUrl = ref(`https://ultifysolutions.com/services/${serviceSlug.value}`)
const robots = ref('index, follow')

// Structured data
const organizationSchema = ref(createOrganizationSchema({
  name: 'Ultify Solutions',
  url: 'https://ultifysolutions.com',
  logo: 'https://ultifysolutions.com/logo.png',
  contactPoint: { telephone: '+61-2-1234-5678', contactType: 'customer service' },
  sameAs: [
    'https://www.facebook.com/UltifySolutions',
    'https://www.linkedin.com/company/ultify-solutions',
    'https://twitter.com/UltifySolutions'
  ]
}))

const webPageSchema = ref(createWebPageSchema({
  name: metaTitle.value,
  description: metaDescription.value,
  url: ogUrl.value
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: serviceName.value, url: ogUrl.value }
]))

const serviceSchema = ref(createServiceSchema({
  name: `${serviceName.value} Services`,
  description: metaDescription.value,
  provider: 'Ultify Solutions',
  serviceType: serviceName.value,
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  }
}))

// Fetch service data
const { data: pageData, error: pageError, refresh: refreshPageData } = await useAsyncData(
  'printAdvertisingServiceData',
  () => $fetch(`/api/service-page?slug=${serviceSlug.value}`),
  { server: true, lazy: false }
)

// Update page data
const updatePageData = () => {
  if (pageData.value) {
    metaTitle.value = pageData.value.metaTitle || metaTitle.value
    metaDescription.value = pageData.value.metaDescription || metaDescription.value
    ogImage.value = pageData.value.ogImage || ogImage.value
    ogUrl.value = pageData.value.ogUrl || ogUrl.value
    canonicalUrl.value = pageData.value.canonicalUrl || canonicalUrl.value
    robots.value = pageData.value.robots || robots.value
    serviceId.value = pageData.value.serviceId || serviceId.value

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

    // Update serviceStore
    serviceStore.setCurrentServiceId(serviceId.value)
    serviceStore.fetchServiceData(serviceId.value)
  }
}

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await refreshPageData()
  updatePageData()
  headerKey.value++
  serviceDetailsKey.value++
})

// Update head
useHead({
  title: metaTitle,
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ]
})

// Update SEO meta tags
useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
  ogImage: ogImage,
  ogUrl: ogUrl,
  twitterCard: 'summary_large_image',
})

// Error handling
onErrorCaptured((err) => {
  console.error('Error captured in print-advertising.vue:', err)
  return true
})

// Lifecycle hooks
onMounted(() => {
  updatePageData()
})
</script>

<style scoped>
/* Additional styling specific to the Print Advertising page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>