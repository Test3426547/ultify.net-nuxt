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
    
    <SuspenseWrapper defaultFallback="Loading header...">
      <HeaderHome />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading quick and easy section...">
      <QuickNEasy />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading carousel...">
      <Carousel />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading service selector...">
      <ServiceSelector />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading consultation...">
      <Consultation />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading digital world...">
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
import { ref, watch, onMounted, onErrorCaptured } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '@/stores'
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

const route = useRoute()
const dataStore = useDataStore()
const error = ref(null)

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

// Watch for route changes
watch(() => route.path, async (newPath) => {
  await updatePageData(newPath)
}, { immediate: true })

// Function to update page data
async function updatePageData(path: string) {
  try {
    // Fetch data for the home page
    const pageData = await $fetch('/api/home-page')
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
    }
  } catch (err) {
    console.error('Error fetching page data:', err)
    error.value = err
  }
}

onErrorCaptured((err) => {
  console.error('Error captured in index.vue:', err)
  error.value = err
  return true
})

onMounted(async () => {
  await dataStore.fetchConsultationData()
  // Fetch other necessary data
  await dataStore.fetchFAQData()
  await dataStore.fetchDigitalWorldData()
  await dataStore.fetchCTAData()
  // ... fetch other data as needed
})

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
</script>

<style scoped>
/* Additional styling specific to the Home page */
</style>