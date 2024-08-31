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
      <template #default>
        <HeaderService :key="`header-${$route.path}`" :serviceId="serviceId" />
      </template>
      <template #fallback>
        <div>Loading header...</div>
      </template>
    </Suspense>
    <WebsiteTechnology />
    <WebsiteDetails />
    <Consultation />
    <DigitalWorld />
    <FAQ />
    <CTA />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onErrorCaptured, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderService from '@/components/HeaderService.vue'
import WebsiteTechnology from '@/components/WebsiteTechnology.vue'
import WebsiteDetails from '@/components/WebsiteDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(1) // Default ID for website development
const error = ref(null)
const serviceName = 'Website Development'
const serviceSlug = 'website-development'

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Expert website development services from Ultify Solutions. Create stunning, responsive, and high-performing websites tailored to your business needs.')
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
  description: 'Professional website development services tailored to your business needs. We create responsive, high-performing, and visually appealing websites.',
  provider: 'Ultify Solutions',
  serviceType: serviceName,
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  }
}))

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    const slug = path.split('/').pop() || serviceSlug
    // Updated API URL to fetch data for the website page
    const pageData = await $fetch(`/api/website-page`)
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
      })
      
      // Update the serviceId when page data is fetched
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in website.vue:', err)
  error.value = err
  return true
})

// Remove the existing onMounted hook
// onMounted(async () => { ... })
</script>

<style scoped>
/* Additional styling specific to the Website Development page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>