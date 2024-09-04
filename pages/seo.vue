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
        <HeaderService :data="pageData.headerService" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <SEOTechnology :data="pageData.seoTechnology" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <SEODetails :data="pageData.seoDetails" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <SEOServices :data="pageData.seoServices" />
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
import SEOTechnology from '@/components/SEOTechnology.vue'
import SEODetails from '@/components/SEODetails.vue'
import SEOServices from '@/components/SEOServices.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('seo-page', () => 
  $fetch('/api/seo-page')
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
  name: pageData.value?.metaTitle || 'SEO Services | Ultify Solutions',
  description: pageData.value?.metaDescription || 'Boost your website\'s visibility with Ultify Solutions\' expert SEO services. Improve rankings, increase organic traffic, and dominate search results.',
  url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/seo'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: 'SEO', url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/seo' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.serviceName || 'SEO Services',
  description: pageData.value?.serviceDescription || 'Comprehensive SEO services to improve your website\'s visibility in search engines, increase organic traffic, and boost your online presence. We use cutting-edge techniques and tools to deliver measurable results.',
  provider: 'Ultify Solutions',
  serviceType: pageData.value?.serviceType || 'Search Engine Optimization',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/seo',
    name: 'Ultify Solutions Website'
  },
  offers: pageData.value?.offers.map(offer => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: offer.name } })) || [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: pageData.value?.hasOfferCatalog.name || 'SEO Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: pageData.value?.hasOfferCatalog.itemListElement[0].name || 'SEO Techniques',
        itemListElement: pageData.value?.hasOfferCatalog.itemListElement[0].itemListElement.map(technique => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: technique.name } })) || []
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
/* Additional styling specific to the SEO page */
</style>