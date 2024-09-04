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
    <StructuredData type="ContactPage" :data="contactPageSchema" />
    
    <ClientOnly>
      <SuspenseWrapper>
        <HeaderContact :data="pageData.headerContact" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <Contact :data="pageData.contact" />
      </SuspenseWrapper>
      <SuspenseWrapper>
        <ContactUsMaps :data="pageData.contactUsMaps" />
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

<script setup>
import { ref } from 'vue'
import { useAsyncData } from '#app'
import { useHead } from '@vueuse/head'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderContact from '@/components/HeaderContact.vue'
import Contact from '@/components/Contact.vue'
import ContactUsMaps from '@/components/ContactUsMaps.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema, createContactPageSchema } from '@/utils/structuredData'

const { data: pageData, error } = await useAsyncData('contact-page', () => 
  $fetch('/api/contact-page')
)

const organizationSchema = ref(createOrganizationSchema({
  name: 'Ultify Solutions',
  url: 'https://ultifysolutions.com',
  logo: 'https://ultifysolutions.com/logo.png',
  contactPoint: {
    telephone: pageData.value?.contactInfo.telephone || '+61-2-1234-5678',
    contactType: 'customer service'
  },
  sameAs: [
    'https://www.facebook.com/UltifySolutions',
    'https://www.linkedin.com/company/ultify-solutions',
    'https://twitter.com/UltifySolutions'
  ]
}))

const webPageSchema = ref(createWebPageSchema({
  name: pageData.value?.meta.title || 'Contact Ultify Solutions - Digital Marketing Agency',
  description: pageData.value?.meta.description || 'Get in touch with Ultify Solutions, your digital marketing partner in Sydney. Reach out for innovative strategies to boost your online presence.',
  url: pageData.value?.meta.ogUrl || 'https://ultifysolutions.com/contact-us'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Contact Us', url: 'https://ultifysolutions.com/contact-us' }
]))

const contactPageSchema = ref(createContactPageSchema({
  telephone: pageData.value?.contactInfo.telephone || '+61-2-1234-5678',
  email: pageData.value?.contactInfo.email || 'info@ultifysolutions.com',
  address: {
    streetAddress: pageData.value?.contactInfo.streetAddress || '123 Digital Street',
    addressLocality: pageData.value?.contactInfo.city || 'Sydney',
    addressRegion: pageData.value?.contactInfo.state || 'NSW',
    postalCode: pageData.value?.contactInfo.postalCode || '2000',
    addressCountry: pageData.value?.contactInfo.country || 'AU'
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
/* Additional styling specific to the Contact Us page */
</style>