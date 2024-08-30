<script setup lang="ts">
interface SeoProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogUrl?: string;
}

const props = withDefaults(defineProps<SeoProps>(), {
  title: 'Ultify Solutions - Digital Marketing Agency',
  description: 'Ultify Solutions is a leading digital marketing agency in Sydney, Australia, offering innovative strategies to boost your online presence.',
  ogImage: '/default-og-image.jpg',
  ogUrl: 'https://ultifysolutions.com'
})

useHead({
  title: props.title,
  titleTemplate: '%s | Ultify Solutions',
  meta: [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.ogImage },
    { property: 'og:url', content: props.ogUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
})
</script>

<template>
  <!-- This component doesn't render anything -->
</template>