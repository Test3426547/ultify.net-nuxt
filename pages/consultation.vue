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
    
    <ClientOnly>
      <SuspenseWrapper>
        <HeaderConsultation :data="pageData.headerConsultation" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <HeroConsultation :data="pageData.heroConsultation" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ConsultationContact :data="pageData.consultationContact" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <Directive :data="pageData.directive" />
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

<script setup>
import { ref } from 'vue'
import { useAsyncData } from '#app'
import { useHead } from '@vueuse/head'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderConsultation from '@/components/HeaderConsultation.vue'
import HeroConsultation from '@/components/HeroConsultation.vue'
import ConsultationContact from '@/components/ConsultationContact.vue'
import Directive from '@/components/Directive.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createServiceSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('consultation-page', () => 
  $fetch('/api/consultation-page')
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
  name: pageData.value?.meta.title || 'Free Digital Marketing Consultation | Ultify Solutions',
  description: pageData.value?.meta.description || 'Book a free consultation with Ultify Solutions. Get expert advice on digital marketing strategies tailored to boost your online presence.',
  url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/consultation'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Consultation', url: 'https://ultifysolutions.com/consultation' }
]))

const serviceSchema = ref(createServiceSchema({
  name: pageData.value?.schema.serviceName || 'Free Digital Marketing Consultation',
  description: pageData.value?.schema.serviceDescription || 'Expert advice on digital marketing strategies tailored to boost your online presence.',
  provider: 'Ultify Solutions',
  serviceType: pageData.value?.schema.serviceType || 'Digital Marketing Consultation',
  areaServed: 'Sydney, Australia',
  availableChannel: {
    url: 'https://ultifysolutions.com/consultation',
    name: 'Ultify Solutions Website'
  }
}))

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
/* Additional styling specific to the Consultation page */
</style>