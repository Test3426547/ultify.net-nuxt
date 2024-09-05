<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p 
    :class="cn(
      'text-sm text-ultify-grey leading-relaxed tracking-wide',
      'px-4 py-2 rounded-full bg-white border border-ultify-grey',
      'shadow-sm transition-all duration-300 ease-in-out',
      'hover:border-emerald-500 hover:text-emerald-600',
      props.class
    )"
  >
    <slot />
  </p>
</template>