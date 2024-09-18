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
      <PrintAdvertisingHeader />
    </SuspenseWrapper>
    <PrintAdvertisingBlog />
    <SuspenseWrapper defaultFallback="Loading Service Details...">
      <PrintAdvertisingDetails />
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
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import PrintAdvertisingHeader from '@/components/views/print-advertising/PrintAdvertisingHeader.vue'
import PrintAdvertisingBlog from '@/components/PrintAdvertisingBlog.vue'
import PrintAdvertisingDetails from '@/components/views/print-advertising/PrintAdvertisingDetails.vue'
import Consultation from '@/components/shared/ConsultationForm.vue'
import DigitalWorld from '@/components/shared/DigitalWorld.vue'
import FAQ from '@/components/shared/FAQ.vue'
import CTA from '@/components/shared/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(6) // Print Advertising service ID
const error = ref(null)
const serviceName = 'Print Advertising'
const serviceSlug = 'print-advertising'

// Add this ref to control the key of HeaderService
const headerKey = ref(0)

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Elevate your brand with Ultify Solutions\' expert print advertising services. Create impactful print campaigns that resonate with your target audience.')
const ogImage = ref(`https://ultifysolutions.com/images/${serviceSlug}-og.jpg`)
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
  description: 'Comprehensive print advertising services to elevate your brand and create impactful campaigns. We offer creative design, strategic placement, and measurable results for all types of print media.',
  provider: 'Ultify Solutions',
  serviceType: serviceName,
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  },
  offers: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Newspaper Advertising' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Magazine Advertising' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brochure Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Poster Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Direct Mail Campaigns' } }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Print Advertising Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Print Advertising Techniques',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Creative Design' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Copywriting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Media Planning and Buying' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Print Production Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Campaign Performance Analysis' } }
        ]
      }
    ]
  }
}))

// Watch for route changes
watch(() => route.path, async () => {
  await updatePageData()
}, { immediate: true })

// Function to update page data
async function updatePageData() {
  try {
    const pageData = await $fetch('/api/print-advertising')
    if (pageData) {
      metaTitle.value = pageData.metaTitle || metaTitle.value
      metaDescription.value = pageData.metaDescription || metaDescription.value
      ogImage.value = pageData.ogImage || ogImage.value
      ogUrl.value = pageData.ogUrl || ogUrl.value
      canonicalUrl.value = pageData.canonicalUrl || canonicalUrl.value
      robots.value = pageData.robots || robots.value
      
      // Update schema data
      webPageSchema.value = createWebPageSchema({
        name: pageData.title || webPageSchema.value.name,
        description: pageData.description || webPageSchema.value.description,
        url: webPageSchema.value.url
      })

      serviceSchema.value = createServiceSchema({
        name: pageData.serviceName || serviceSchema.value.name,
        description: pageData.serviceDescription || serviceSchema.value.description,
        provider: serviceSchema.value.provider,
        serviceType: pageData.serviceType || serviceSchema.value.serviceType,
        areaServed: serviceSchema.value.areaServed,
        availableChannel: serviceSchema.value.availableChannel,
        offers: pageData.offers || serviceSchema.value.offers,
        hasOfferCatalog: pageData.hasOfferCatalog || serviceSchema.value.hasOfferCatalog
      })
      
      // Update the serviceId when page data is fetched
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching print-advertising data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in print-advertising.vue:', err)
  error.value = err
  return true
})

</script>

<style scoped>
/* Additional styling specific to the Print Advertising page */
</style>