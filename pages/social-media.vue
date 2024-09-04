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
        <HeaderService :key="`header-${$route.path}`" :data="pageData.headerService" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <SocialMediaBlog :data="pageData.socialMediaBlog" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <SocialMediaDetails :data="pageData.socialMediaDetails" />
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
import SocialMediaDetails from '@/components/SocialMediaDetails.vue'
import SocialMediaBlog from '@/components/SocialMediaBlog.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('social-media-page', () => 
  $fetch('/api/social-media-page')
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
  name: pageData.value?.metaTitle || 'Social Media Marketing Services | Ultify Solutions',
  description: pageData.value?.metaDescription || 'Boost your brand\'s online presence with Ultify Solutions\' expert social media marketing services. Engage your audience and drive growth across all major platforms.',
  url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/social-media-marketing'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Services', url: 'https://ultifysolutions.com/services' },
  { name: 'Social Media Marketing', url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/social-media-marketing' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.serviceName || 'Social Media Marketing Services',
  description: pageData.value?.serviceDescription || 'Comprehensive social media marketing services to boost your brand\'s online presence, engage your target audience, and drive business growth across all major social media platforms.',
  provider: 'Ultify Solutions',
  serviceType: pageData.value?.serviceType || 'Social Media Marketing',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: pageData.value?.ogUrl || 'https://ultifysolutions.com/services/social-media-marketing',
    name: 'Ultify Solutions Website'
  },
  offers: pageData.value?.offers.map(offer => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: offer.name } })) || [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: pageData.value?.hasOfferCatalog.name || 'Social Media Marketing Services',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: pageData.value?.hasOfferCatalog.itemListElement[0].name || 'Service Types',
        itemListElement: pageData.value?.hasOfferCatalog.itemListElement[0].itemListElement.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: service.name } })) || []
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
/* Additional styling specific to the Social Media Marketing page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>