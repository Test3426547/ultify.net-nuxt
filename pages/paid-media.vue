<template>
  <div>
    <SeoMeta 
      :title="pageData.meta.title"
      :description="pageData.meta.description"
      :ogImage="pageData.meta.ogImage"
      :ogUrl="pageData.meta.ogUrl"
      :canonicalUrl="pageData.meta.canonicalUrl"
      :robots="pageData.meta.robots"
    />
    <StructuredData type="Organization" :data="organizationSchema" />
    <StructuredData type="WebPage" :data="webPageSchema" />
    <StructuredData type="BreadcrumbList" :data="breadcrumbSchema" />
    <StructuredData type="Service" :data="serviceSchema" />
    <StructuredData type="FAQPage" :data="faqSchema" />
    
    <ClientOnly>
      <SuspenseWrapper defaultFallback="Loading header...">
        <HeaderService :data="pageData.headerService" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <PaidMediaTechnology :data="pageData.paidMediaTechnology" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <PaidMediaDetails :data="pageData.paidMediaDetails" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <Consultation :data="pageData.consultation" />
      </SuspenseWrapper>
      <SuspenseWrapper defaultFallback="Loading Digital World...">
        <DigitalWorld :data="pageData.digitalWorld" />
      </SuspenseWrapper>
      <SuspenseWrapper defaultFallback="Loading FAQ...">
        <FAQ :data="pageData.faq" />
      </SuspenseWrapper>
      <SuspenseWrapper defaultFallback="Loading CTA...">
        <CTA :data="pageData.cta" />
      </SuspenseWrapper>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData } from '#app'
import { useHead } from '@vueuse/head'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
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

const { data: pageData, error } = await useAsyncData('paid-media-page', () => 
  $fetch('/api/paid-media-page')
)

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
  name: pageData.value?.meta.title || 'Paid Media Services | Ultify Solutions',
  description: pageData.value?.meta.description || 'Maximize your ROI with Ultify Solutions\' expert paid media services. Drive targeted traffic and conversions through strategic PPC, display, and social media advertising campaigns.',
  url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/paid-media'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: 'Paid Media', url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/paid-media' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.schema.service.name || 'Paid Media Services',
  description: pageData.value?.schema.service.description || 'Comprehensive paid media services to maximize your ROI and drive targeted traffic. We offer strategic PPC, display advertising, and social media advertising campaigns tailored to your business goals.',
  provider: pageData.value?.schema.service.provider || 'Ultify Solutions',
  serviceType: pageData.value?.schema.service.serviceType || 'Paid Media Advertising',
  areaServed: pageData.value?.schema.service.areaServed || 'Sydney, Australia',
  availableChannel: {
    url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/paid-media',
    name: 'Ultify Solutions Website'
  },
  offers: pageData.value?.schema.service.offers.map(offer => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: offer.name } })) || [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Paid Media Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Paid Media Techniques',
        itemListElement: pageData.value?.schema.service.techniques.map(technique => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: technique.name } })) || []
      }
    ]
  }
}))

const faqSchema = ref({
  mainEntity: pageData.value?.schema.faq.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  })) || []
})

useHead(() => ({
  title: pageData.value?.meta.title,
  meta: [
    { name: 'description', content: pageData.value?.meta.description },
    { property: 'og:title', content: pageData.value?.meta.title },
    { property: 'og:description', content: pageData.value?.meta.description },
    { property: 'og:image', content: pageData.value?.meta.ogImage },
    { property: 'og:url', content: pageData.value?.meta.ogUrl },
    { name: 'robots', content: pageData.value?.meta.robots }
  ],
  link: [
    { rel: 'canonical', href: pageData.value?.meta.canonicalUrl }
  ]
}))

if (error.value) {
  console.error('Error fetching page data:', error.value)
}
</script>

<style scoped>
/* Additional styling specific to the Paid Media page */
</style>