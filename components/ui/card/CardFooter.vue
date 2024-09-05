<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div 
    :class="cn(
      'flex items-center p-6',
      'bg-white rounded-full shadow-sm',
      'border border-ultify-grey',
      'transition-all duration-300 ease-in-out',
      'hover:border-emerald-500',
      props.class
    )"
  >
    <slot />
  </div>
</template>