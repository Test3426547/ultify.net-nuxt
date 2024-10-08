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
      <SocialMediaHeader />
    </SuspenseWrapper>
    <SocialMediaBlog />
    <SuspenseWrapper defaultFallback="Loading Service Details...">
      <SocialMediaDetails />
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
import { ref, onErrorCaptured, watch } from 'vue'
import { useRoute } from 'vue-router'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import SocialMediaHeader from '@/components/views/social-media/SocialMediaHeader.vue'
import SocialMediaDetails from '@/components/views/social-media/SocialMediaDetails.vue'
import SocialMediaBlog from '@/components/SocialMediaBlog.vue'
import Consultation from '@/components/shared/ConsultationForm.vue'
import DigitalWorld from '@/components/shared/DigitalWorld.vue'
import FAQ from '@/components/shared/FAQ.vue'
import CTA from '@/components/shared/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(2) // Set to 2 for Social Media
const error = ref(null)
const serviceName = 'Social Media Marketing'
const serviceSlug = 'social-media-marketing'

// Add this ref to control the key of HeaderService
const headerKey = ref(0)

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Boost your brand\'s online presence with Ultify Solutions\' expert social media marketing services. Engage your audience and drive growth across all major platforms.')
const ogImage = ref(`https://ultifysolutions.com/images/${serviceSlug}-og.jpg`)
const ogUrl = ref(`https://ultifysolutions.com/services/${serviceSlug}`)
const canonicalUrl = ref(`https://ultifysolutions.com/services/${serviceSlug}`)
const robots = ref('index, follow')

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
  description: 'Comprehensive social media marketing services to boost your brand\'s online presence, engage your target audience, and drive business growth across all major social media platforms.',
  provider: 'Ultify Solutions',
  serviceType: serviceName,
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  },
  offers: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facebook Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Instagram Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LinkedIn Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Twitter Marketing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'TikTok Marketing' } }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Social Media Marketing Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Service Types',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Strategy Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Creation and Curation' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Community Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Advertising' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Analytics and Reporting' } }
        ]
      }
    ]
  }
}))

onErrorCaptured((err) => {
  console.error('Error captured in social-media.vue:', err)
  error.value = err
  return true
})

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    const pageData = await $fetch('/api/social-media-page')
    if (pageData) {
      metaTitle.value = pageData.metaTitle || metaTitle.value
      metaDescription.value = pageData.metaDescription || metaDescription.value
      ogImage.value = pageData.ogImage || ogImage.value
      ogUrl.value = pageData.ogUrl || ogUrl.value
      canonicalUrl.value = pageData.canonicalUrl || canonicalUrl.value
      robots.value = pageData.robots || robots.value

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
      
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
}
</script>

<style scoped>
/* Additional styling specific to the Social Media Marketing page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>