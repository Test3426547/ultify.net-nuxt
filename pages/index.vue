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
    
    <HeaderHome />
    <QuickNEasy />
    <ServiceCards @loaded="componentLoaded('ServiceCards')" />
    <OurServices />
    <Consultation />
    <DigitalWorld />
    <FAQ @loaded="componentLoaded('FAQ')" />
    <CTA />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import HeaderHome from '@/components/HeaderHome.vue'
import QuickNEasy from '@/components/QuickNEasy.vue'
import ServiceCards from '@/components/ServiceCards.vue'
import OurServices from '@/components/OurServices.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import Footer from '~/components/Footer.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema } from '@/utils/structuredData'

const metaTitle = ref('Home | Ultify Solutions')
const metaDescription = ref('Ultify Solutions is a leading digital marketing agency offering innovative strategies to boost your online presence.')
const ogImage = ref('https://ultifysolutions.com/images/home-og.jpg')
const ogUrl = ref('https://ultifysolutions.com')
const canonicalUrl = ref('https://ultifysolutions.com')
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
  name: 'Ultify Solutions - Digital Marketing Agency',
  description: 'Ultify Solutions is a leading digital marketing agency offering innovative strategies to boost your online presence.',
  url: 'https://ultifysolutions.com'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' }
]))

// New code for handling component loading
const loadedComponents = ref(new Set())
const allComponentsLoaded = ref(false)

const componentLoaded = (componentName: string) => {
  loadedComponents.value.add(componentName)
  checkAllComponentsLoaded()
}

const checkAllComponentsLoaded = () => {
  const requiredComponents = ['ServiceCards', 'FAQ', 'OurServices']
  allComponentsLoaded.value = requiredComponents.every(comp => loadedComponents.value.has(comp))
}

watch(allComponentsLoaded, (newValue) => {
  if (newValue) {
    console.log('All components are loaded')
    // Perform any actions needed when all components are loaded
  }
})

// If you're planning to fetch data from Strapi in the future, you can add it here
// For example:
/*
const { data: pageData } = await useFetch('/api/home-page')
if (pageData.value) {
  metaTitle.value = pageData.value.metaTitle || metaTitle.value
  metaDescription.value = pageData.value.metaDescription || metaDescription.value
  ogImage.value = pageData.value.ogImage || ogImage.value
  ogUrl.value = pageData.value.ogUrl || ogUrl.value
  canonicalUrl.value = pageData.value.canonicalUrl || canonicalUrl.value
  robots.value = pageData.value.robots || robots.value

  webPageSchema.value = createWebPageSchema({
    name: pageData.value.title || webPageSchema.value.name,
    description: pageData.value.description || webPageSchema.value.description,
    url: webPageSchema.value.url
  })
}
*/
</script>

<style scoped>
/* Additional styling specific to the Home page */
</style>