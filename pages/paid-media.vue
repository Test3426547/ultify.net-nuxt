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
    <StructuredData type="FAQPage" :data="faqSchema" />
    
    <Suspense>
        <HeaderService :serviceId="serviceId" />
        <template #fallback>
          <div>Loading header...</div>
        </template>
    </Suspense>
    <PaidMediaTechnology />
    <PaidMediaDetails />
    <Consultation />
    <DigitalWorld />
    <FAQ />
    <CTA />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onErrorCaptured } from 'vue'
import { useAsyncData } from '#app'
import HeaderService from '@/components/HeaderService.vue'
import PaidMediaTechnology from '@/components/PaidMediaTechnology.vue'
import PaidMediaDetails from '@/components/PaidMediaDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const serviceId = ref(4)
const serviceName = 'Paid Media'
const serviceSlug = 'paid-media'
const error = ref(null)

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Maximize your ROI with Ultify Solutions\' expert paid media services. Drive targeted traffic and conversions through strategic PPC, display, and social media advertising campaigns.')
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
  description: 'Comprehensive paid media services to maximize your ROI and drive targeted traffic. We offer strategic PPC, display advertising, and social media advertising campaigns tailored to your business goals.',
  provider: 'Ultify Solutions',
  serviceType: 'Paid Media Advertising',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  },
  offers: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Ads Management' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Facebook Ads Management' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'LinkedIn Ads Management' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Display Advertising' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retargeting Campaigns' } }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Paid Media Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Paid Media Techniques',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audience Targeting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ad Copywriting' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bid Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'A/B Testing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Analytics' } }
        ]
      }
    ]
  }
}))

const faqSchema = ref({
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is paid media advertising?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paid media advertising refers to any form of advertising where you pay to place your content in front of a specific audience. This includes platforms like Google Ads, Facebook Ads, LinkedIn Ads, and display advertising networks.'
      }
    },
    {
      '@type': 'Question',
      name: 'How can paid media benefit my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paid media can benefit your business by providing immediate visibility, allowing precise targeting of your ideal audience, offering measurable results, and scaling your marketing efforts quickly. It\'s an effective way to drive traffic, generate leads, and increase conversions.'
      }
    },
    {
      '@type': 'Question',
      name: 'What platforms do you use for paid media advertising?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We utilize a variety of platforms based on your target audience and business goals. This typically includes Google Ads for search and display advertising, Facebook and Instagram for social media advertising, LinkedIn for B2B marketing, and various programmatic advertising platforms for broader reach.'
      }
    }
  ]
})

onErrorCaptured((err) => {
  error.value = err
  return true
})

onMounted(async () => {
  try {
    const pageData = await $fetch(`/api/service-page`, {
      params: { slug: serviceSlug }
    })
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

      if (pageData.faq) {
        faqSchema.value.mainEntity = pageData.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        }))
      }
      
      // Update the serviceId when page data is fetched
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
})

// Strapi data fetching logic
// const { data: pageData, error } = await useAsyncData(
//   'paid-media-page',
//   () => $fetch(`/api/${serviceSlug}-page`).catch(error => {
//     console.warn(`API route /api/${serviceSlug}-page not found. Using default data.`)
//     return null
//   })
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

//   if (pageData.value.faq) {
//     faqSchema.value.mainEntity = pageData.value.faq.map(item => ({
//       '@type': 'Question',
//       name: item.question,
//       acceptedAnswer: {
//         '@type': 'Answer',
//         text: item.answer
//       }
//     }))
//   }
// }
</script>

<style scoped>
/* Additional styling specific to the Paid Media page */
</style>