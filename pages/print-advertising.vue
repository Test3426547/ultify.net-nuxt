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
    <PrintMediaDetails />
    <Consultation />
    <DigitalWorld />
    <FAQ />
    <CTA />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import HeaderService from '@/components/HeaderService.vue'
import PrintMediaDetails from '@/components/PrintMediaDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(6) // Print Advertising service ID
const error = ref(null)
const serviceName = 'Print Advertising'
const serviceSlug = 'print-advertising'

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
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    const slug = path.split('/').pop() || serviceSlug
    const pageData = await $fetch(`/api/${slug}-page`)
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
    console.error('Error fetching page data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in print-advertising.vue:', err)
  error.value = err
  return true
})

// Strapi data fetching logic
// const { data: pageData, error } = await useAsyncData(
//   'print-advertising-page',
//   () => $fetch(`/api/${serviceSlug}-page`)
// )

// if (error.value) {
//   console.error('Error fetching page data:', error.value)
// } else if (pageData.value) {
//   metaTitle.value = pageData.value.metaTitle || metaTitle.value
//   metaDescription.value = pageData.value.metaDescription || metaDescription.value
//   ogImage.value = pageData.value.ogImage || ogImage.value
//   ogUrl.value = pageData.value.ogUrl || ogUrl.value
//   canonicalUrl.value = pageData.value.canonicalUrl || canonicalUrl.value
//   robots.value = pageData.value.robots || robots.value
  
//   // Update schema data
//   webPageSchema.value = createWebPageSchema({
//     name: pageData.value.title || webPageSchema.value.name,
//     description: pageData.value.description || webPageSchema.value.description,
//     url: webPageSchema.value.url
//   })

//   serviceSchema.value = createServiceSchema({
//     name: pageData.value.serviceName || serviceSchema.value.name,
//     description: pageData.value.serviceDescription || serviceSchema.value.description,
//     provider: serviceSchema.value.provider,
//     serviceType: pageData.value.serviceType || serviceSchema.value.serviceType,
//     areaServed: serviceSchema.value.areaServed,
//     availableChannel: serviceSchema.value.availableChannel,
//     offers: pageData.value.offers || serviceSchema.value.offers,
//     hasOfferCatalog: pageData.value.hasOfferCatalog || serviceSchema.value.hasOfferCatalog
//   })

//   // If you have FAQ data, you can add it here
//   // if (pageData.value.faq) {
//   //   faqSchema.value = {
//   //     mainEntity: pageData.value.faq.map(item => ({
//   //       '@type': 'Question',
//   //       name: item.question,
//   //       acceptedAnswer: {
//   //         '@type': 'Answer',
//   //         text: item.answer
//   //       }
//   //     }))
//   //   }
//   // }
// }
</script>

<style scoped>
/* Additional styling specific to the Print Advertising page */
</style>