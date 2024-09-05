<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h3
    :class="
      cn(
        'text-2xl font-bold leading-tight tracking-wide',
        'text-emerald-500',
        'mb-4 py-2 px-6',
        'inline-block',
        'bg-white rounded-full',
        'border border-emerald-200',
        'shadow-sm',
        'transition-all duration-300 ease-in-out',
        'hover:shadow-md hover:border-emerald-300',
        props.class
      )
    "
  >
    <slot />
  </h3>
</template>