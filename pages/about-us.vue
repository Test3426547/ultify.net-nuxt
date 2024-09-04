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
    <SuspenseWrapper defaultFallback="Loading Our DNA...">
      <OurDNA />
    </SuspenseWrapper>
    <AboutUsDetails />
    <Consultation />
    <SuspenseWrapper defaultFallback="Loading Digital World...">
      <DigitalWorld />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading FAQ...">
      <FAQ />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading CTA...">
      <CTA />
    </SuspenseWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured, watch } from 'vue'
import { useRoute } from 'vue-router'
import SuspenseWrapper from '@/components/SuspenseWrapper.vue'
import HeaderAboutUs from '@/components/HeaderAboutUs.vue'
import OurDNA from '@/components/OurDNA.vue'
import AboutUsDetails from '@/components/AboutUsDetails.vue'
import Consultation from '@/components/Consultation.vue'
import DigitalWorld from '@/components/DigitalWorld.vue'
import FAQ from '@/components/FAQ.vue'
import CTA from '@/components/CTA.vue'
import SeoMeta from '@/components/SeoMeta.vue'
import StructuredData from '@/components/StructuredData.vue'
import { createOrganizationSchema, createWebPageSchema, createBreadcrumbSchema } from '@/utils/structuredData'

const route = useRoute()
const error = ref(null)
const headerKey = ref(0)

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
  description: metaDescription.value,
  url: ogUrl.value
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'About Us', url: 'https://ultifysolutions.com/about-us' }
]))

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
  // Increment the headerKey to force re-render of HeaderAboutUs
  headerKey.value++
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    // Fetch data for the about-us page
    const pageData = await $fetch('/api/about-page')
    if (pageData) {
      metaTitle.value = pageData.metaTitle || metaTitle.value
      metaDescription.value = pageData.metaDescription || metaDescription.value
      ogImage.value = pageData.ogImage || ogImage.value
      ogUrl.value = pageData.ogUrl || ogUrl.value
      canonicalUrl.value = pageData.canonicalUrl || canonicalUrl.value
      robots.value = pageData.robots || robots.value

      webPageSchema.value = createWebPageSchema({
        name: pageData.title || webPageSchema.value.name,
        description: pageData.description || webPageSchema.value.description,
        url: webPageSchema.value.url
      })

      // Update other components' data if needed
      // For example:
      // aboutUsData.value = pageData.aboutUsContent
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in about-us.vue:', err)
  error.value = err
  return true
})
</script>

<style scoped>
/* Additional styling specific to the About Us page */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Add more specific styles as needed */
</style>