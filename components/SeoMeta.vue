<script setup>
import { useHead } from '#app'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ogImage: {
    type: String,
    default: '/default-og-image.jpg'
  },
  ogUrl: {
    type: String,
    required: true
  },
  canonicalUrl: {
    type: String,
    default: ''
  },
  robots: {
    type: String,
    default: 'index, follow'
  }
})

useHead({
  title: props.title,
  meta: [
    { name: 'description', content: props.description },
    { property: 'og:title', content: props.title },
    { property: 'og:description', content: props.description },
    { property: 'og:image', content: props.ogImage },
    { property: 'og:url', content: props.ogUrl },
    { name: 'robots', content: props.robots }
  ],
  link: [
    { rel: 'canonical', href: props.canonicalUrl || props.ogUrl }
  ]
})
</script>