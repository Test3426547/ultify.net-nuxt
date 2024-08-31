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
    
    <HeaderAboutUs />
    <AboutUs />
    <AboutUsDetails />
    <Consultation />
    <DigitalWorld />
    <FAQ />
    <CTA />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import HeaderAboutUs from '@/components/HeaderAboutUs.vue'
import AboutUs from '@/components/AboutUs.vue'
import AboutUsDetails from '@/components/AboutUsDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema } from '@/utils/structuredData'

const metaTitle = ref('About Us | Ultify Solutions')
const metaDescription = ref('Learn about Ultify Solutions, a leading digital marketing agency in Sydney. Discover our mission, values, and the team behind our innovative strategies.')
const ogImage = ref('https://ultifysolutions.com/images/about-us-og.jpg')
const ogUrl = ref('https://ultifysolutions.com/about-us')
const canonicalUrl = ref('https://ultifysolutions.com/about-us')
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
  name: 'About Ultify Solutions - Digital Marketing Agency',
  description: 'Learn about Ultify Solutions, a leading digital marketing agency in Sydney. Discover our mission, values, and the team behind our innovative strategies.',
  url: 'https://ultifysolutions.com/about-us'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'About Us', url: 'https://ultifysolutions.com/about-us' }
]))

onMounted(() => {
  // You can add any necessary mounted logic here
})

// Strapi data fetching logic for future use
// Uncomment and adjust when ready to fetch data from Strapi
/*
const { data: pageData } = await useFetch('/api/about-page')
if (pageData.value) {
  metaTitle.value = pageData.value.metaTitle || metaTitle.value
  metaDescription.value = pageData.value.metaDescription || metaDescription.value
  ogImage.value = pageData.value.ogImage || ogImage.value
  ogUrl.value = pageData.value.ogUrl || ogUrl.value
  canonicalUrl.value = pageData.value.canonicalUrl || canonicalUrl.value
  robots.value = pageData.value.robots || robots.value
  
  // Update schema data if needed
  webPageSchema.value = createWebPageSchema({
    name: pageData.value.title || webPageSchema.value.name,
    description: pageData.value.description || webPageSchema.value.description,
    url: webPageSchema.value.url
  })

  // You can also update other components' data here if needed
  // For example:
  // aboutUsData.value = pageData.value.aboutUsContent
}
*/
</script>

<style scoped>
/* Additional styling specific to the About Us page */
</style>