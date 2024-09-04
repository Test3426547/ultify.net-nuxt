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
        <ContentCreationBlog :data="pageData.contentCreationBlog" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ContentCreationDetails :data="pageData.contentCreationDetails" />
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
import ContentCreationBlog from '@/components/ContentCreationBlog.vue'
import ContentCreationDetails from '@/components/ContentCreationDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('content-creation-page', () => 
  $fetch('/api/content-creation-page')
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
  name: pageData.value?.meta.title || 'Content Creation Services | Ultify Solutions',
  description: pageData.value?.meta.description || 'Elevate your brand with Ultify Solutions\' expert content creation services. Engage your audience with compelling, SEO-optimized content across all platforms.',
  url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/content-creation'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: 'Content Creation', url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/content-creation' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.schema.service.name || 'Content Creation Services',
  description: pageData.value?.schema.service.description || 'Comprehensive content creation services to elevate your brand and engage your audience.',
  provider: pageData.value?.schema.service.provider || 'Ultify Solutions',
  serviceType: pageData.value?.schema.service.serviceType || 'Content Creation',
  areaServed: pageData.value?.schema.service.areaServed || 'Sydney, Australia',
  availableChannel: {
    url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/services/content-creation',
    name: 'Ultify Solutions Website'
  },
  offers: pageData.value?.schema.service.offers.map(offer => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: offer.name } })) || [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Content Creation Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Content Creation Techniques',
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
/* Additional styling specific to the Content Creation page */
</style>