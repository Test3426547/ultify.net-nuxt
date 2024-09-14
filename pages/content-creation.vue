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
    
    <SuspenseWrapper defaultFallback="Loading header...">
      <HeaderService :key="`header-${headerKey}`" :serviceId="serviceId" />
    </SuspenseWrapper>
    <ContentCreationBlog />
    <SuspenseWrapper defaultFallback="Loading Service Details...">
      <ServiceDetails :key="`header-${headerKey}`" :serviceId="serviceId" />
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
import HeaderService from '@/components/views/content-creation/ServiceHeader.vue'
import ContentCreationBlog from '@/components/ContentCreationBlog.vue'
import ServiceDetails from '@/components/shared/ServiceDetails.vue'
import Consultation from '@/components/shared/ConsultationForm.vue'
import DigitalWorld from '@/components/shared/DigitalWorld.vue'
import FAQ from '@/components/shared/FAQ.vue'
import CTA from '@/components/shared/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const route = useRoute()
const serviceId = ref(5) // Content Creation service ID
const error = ref(null)
const serviceName = 'Content Creation'
const serviceSlug = 'content-creation'

// Add this ref to control the key of HeaderService
const headerKey = ref(0)

const metaTitle = ref(`${serviceName} Services | Ultify Solutions`)
const metaDescription = ref('Elevate your brand with Ultify Solutions\' expert content creation services. Engage your audience with compelling, SEO-optimized content across all platforms.')
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
  description: 'Comprehensive content creation services to elevate your brand and engage your audience. We offer SEO-optimized content across various formats and platforms, tailored to your business goals and target audience.',
  provider: 'Ultify Solutions',
  serviceType: serviceName,
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: ogUrl.value,
    name: 'Ultify Solutions Website'
  },
  offers: [
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Blog Writing' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Social Media Content' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Production' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Infographic Design' } },
    { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Whitepaper Creation' } }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Content Creation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Content Creation Techniques',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Audience Research' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Voice Development' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Strategy' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Performance Analysis' } }
        ]
      }
    ]
  }
}))

const faqSchema = ref({
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What types of content do you create?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We create a wide range of content including blog posts, social media content, videos, infographics, whitepapers, e-books, case studies, and more. Our content is tailored to your specific needs and target audience.'
      }
    },
    {
      '@type': 'Question',
      name: 'How does content creation benefit my business?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Content creation benefits your business by improving your online visibility, establishing your brand as an industry authority, engaging your target audience, driving website traffic, generating leads, and supporting your overall marketing and SEO efforts.'
      }
    },
    {
      '@type': 'Question',
      name: 'Do you optimize content for SEO?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, we optimize all content for SEO. This includes keyword research, strategic keyword placement, meta descriptions, title tags, and internal linking. Our goal is to create content that not only engages your audience but also ranks well in search engines.'
      }
    }
  ]
})

// Remove the watch function and updatePageData function

// Add this instead:
onMounted(async () => {
  try {
    const pageData = await $fetch('/api/content-creation-page')
    if (pageData) {
      // Update meta and schema data
      metaTitle.value = pageData.metaTitle || metaTitle.value
      metaDescription.value = pageData.metaDescription || metaDescription.value
      ogImage.value = pageData.ogImage || ogImage.value
      ogUrl.value = pageData.ogUrl || ogUrl.value
      canonicalUrl.value = pageData.canonicalUrl || canonicalUrl.value
      robots.value = pageData.robots || robots.value
      
      // Update schemas if needed
      // For example:
      // webPageSchema.value = createWebPageSchema({
      //   name: pageData.metaTitle,
      //   description: pageData.metaDescription,
      //   url: pageData.ogUrl
      // })
      
      // Update the serviceId
      serviceId.value = pageData.serviceId || serviceId.value
    }
  } catch (err) {
    console.error('Error fetching content creation page data:', err)
    error.value = err
  }
})

// Keep the onErrorCaptured function
onErrorCaptured((err) => {
  console.error('Error captured in content-creation.vue:', err)
  error.value = err
  return true
})

</script>

<style scoped>
/* Additional styling specific to the Content Creation page */
</style>