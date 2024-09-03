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
    <StructuredData type="ContactPage" :data="contactPageSchema" />
    
    <HeaderContact />
    <Contact />
    <ContactUsMaps />
    <Consultation />
    <DigitalWorld />
    <SuspenseWrapper defaultFallback="Loading FAQ...">
      <FAQ />
    </SuspenseWrapper>
    <SuspenseWrapper defaultFallback="Loading CTA...">
      <CTA />
    </SuspenseWrapper>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

const metaTitle = ref('Contact Us | Ultify Solutions')
const metaDescription = ref('Get in touch with Ultify Solutions, your digital marketing partner in Sydney. Reach out for innovative strategies to boost your online presence.')
const ogImage = ref('https://ultifysolutions.com/images/contact-us-og.jpg')
const ogUrl = ref('https://ultifysolutions.com/contact-us')
const canonicalUrl = ref('https://ultifysolutions.com/contact-us')
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
  name: 'Contact Ultify Solutions - Digital Marketing Agency',
  description: 'Get in touch with Ultify Solutions, your digital marketing partner in Sydney. Reach out for innovative strategies to boost your online presence.',
  url: 'https://ultifysolutions.com/contact-us'
}))

const breadcrumbSchema = ref(createBreadcrumbSchema([
  { name: 'Home', url: 'https://ultifysolutions.com' },
  { name: 'Contact Us', url: 'https://ultifysolutions.com/contact-us' }
]))

const contactPageSchema = ref(createContactPageSchema({
  telephone: '+61-2-1234-5678',
  email: 'info@ultifysolutions.com',
  address: {
    streetAddress: '123 Digital Street',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    postalCode: '2000',
    addressCountry: 'AU'
  }
}))

onMounted(() => {
  // You can add any necessary mounted logic here
})

// Strapi data fetching logic for future use
// Uncomment and adjust when ready to fetch data from Strapi
/*
const { data: pageData } = await useFetch('/api/contact-page')
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

  contactPageSchema.value = createContactPageSchema({
    telephone: pageData.value.telephone || contactPageSchema.value.telephone,
    email: pageData.value.email || contactPageSchema.value.email,
    address: {
      streetAddress: pageData.value.streetAddress || contactPageSchema.value.address.streetAddress,
      addressLocality: pageData.value.city || contactPageSchema.value.address.addressLocality,
      addressRegion: pageData.value.state || contactPageSchema.value.address.addressRegion,
      postalCode: pageData.value.postalCode || contactPageSchema.value.address.postalCode,
      addressCountry: pageData.value.country || contactPageSchema.value.address.addressCountry
    }
  })

  // You can also update other components' data here if needed
  // For example:
  // contactData.value = pageData.value.contactContent
}
*/
</script>

<style scoped>
/* Additional styling specific to the Contact Us page */
</style>