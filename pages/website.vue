<template>
  <div>
    <SeoMeta
      :title="pageData.metaTitle"
      :description="pageData.metaDescription"
      :ogImage="pageData.ogImage"
      :ogUrl="pageData.ogUrl"
      :canonicalUrl="pageData.canonicalUrl"
      :robots="pageData.robots"
    />
    <StructuredData type="Organization" :data="organizationSchema" />
    <StructuredData type="WebPage" :data="webPageSchema" />
    <StructuredData type="BreadcrumbList" :data="breadcrumbSchema" />
    <StructuredData type="Service" :data="serviceSchema" />

    <ClientOnly>
      <SuspenseWrapper defaultFallback="Loading header...">
        <HeaderService :key="`header-${headerKey}`" :data="pageData.headerService" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ServiceTechnologyLeft :data="pageData.serviceTechnologyLeft" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ServiceTechnologyRight :data="pageData.serviceTechnologyRight" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <WebsiteDetails :data="pageData.websiteDetails" />
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
import ServiceTechnologyLeft from '@/components/ServiceTechnologyLeft.vue'
import ServiceTechnologyRight from '@/components/ServiceTechnologyRight.vue'
import WebsiteDetails from '@/components/WebsiteDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const headerKey = ref(0)

const { data: pageData, error } = await useAsyncData('website-page', () => 
  $fetch('/api/website-page')
)

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
  name: pageData.value?.metaTitle || 'Website Development Services | Ultify Solutions',
  description: pageData.value?.metaDescription || 'Expert website development services from Ultify Solutions. Create stunning, responsive, and high-performing websites tailored to your business needs.',
  url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/website-development'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: 'Website Development', url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/website-development' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.serviceName || 'Website Development Services',
  description: pageData.value?.serviceDescription || 'Professional website development services tailored to your business needs. We create responsive, high-performing, and visually appealing websites.',
  provider: 'Ultify Solutions',
  serviceType: pageData.value?.serviceType || 'Website Development',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/website-development',
    name: 'Ultify Solutions Website'
  },
  offers: pageData.value?.offers.map(offer => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: offer.name } })) || [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: pageData.value?.hasOfferCatalog.name || 'Website Development Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: pageData.value?.hasOfferCatalog.itemListElement[0].name || 'Development Technologies',
        itemListElement: pageData.value?.hasOfferCatalog.itemListElement[0].itemListElement.map(tech => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: tech.name } })) || []
      }
    ]
  }
}))

useHead(() => ({
  title: pageData.value?.metaTitle,
  meta: [
    { name: 'description', content: pageData.value?.metaDescription },
    { property: 'og:title', content: pageData.value?.metaTitle },
    { property: 'og:description', content: pageData.value?.metaDescription },
    { property: 'og:image', content: pageData.value?.ogImage },
    { property: 'og:url', content: pageData.value?.ogUrl },
    { name: 'robots', content: pageData.value?.robots }
  ],
  link: [
    { rel: 'canonical', href: pageData.value?.canonicalUrl }
  ]
}))

if (error.value) {
  console.error('Error fetching page data:', error.value)
}
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