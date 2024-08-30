<!-- components/StructuredData.vue -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true
  },
  data: {
    type: Object,
    required: true
  }
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': props.type,
  ...props.data
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(structuredData.value)
    }
  ]
})
</script>

<template>
  <!-- This component doesn't render anything visually -->
</template>