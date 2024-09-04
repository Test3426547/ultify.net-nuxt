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
    
    <ClientOnly>
      <SuspenseWrapper>
        <HeaderHome :data="pageData.headerData" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <QuickNEasy :data="pageData.qneData" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <Carousel :data="pageData.carouselData" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ServiceSelector :data="pageData.servicesData" />
      </SuspenseWrapper>
      <Consultation :data="pageData.consultationData" />
      <SuspenseWrapper>
        <DigitalWorld :data="pageData.digitalWorldData" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <FAQ :data="pageData.faqData" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <CTA :data="pageData.ctaData" />
      </SuspenseWrapper>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAsyncData } from '#app'
import { useHead } from '@vueuse/head'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderHome from '@/components/HeaderHome.vue'
import QuickNEasy from '@/components/QuickNEasy.vue'
import Carousel from '@/components/Carousel.vue'
import ServiceSelector from '@/components/ServiceSelector.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('home-page', () => 
  $fetch('/api/home-page')
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
  name: pageData.value?.meta.title || 'Ultify Solutions - Digital Marketing Agency',
  description: pageData.value?.meta.description || 'Ultify Solutions is a leading digital marketing agency offering innovative strategies to boost your online presence.',
  url: 'https://ultifysolutions.com'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' }
]))

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
/* Add any page-specific styles here */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>