<script setup lang="ts">
import { CollapsibleTrigger, type CollapsibleTriggerProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CollapsibleTriggerProps & {
  class?: string
}>()
</script>

<template>
  <CollapsibleTrigger 
    v-bind="props"
    :class="cn(
      'w-full px-6 py-3 rounded-full',
      'bg-emerald-500 text-white',
      'hover:bg-emerald-600',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
      'transition-all duration-300 ease-in-out',
      'flex items-center justify-between',
      'text-left font-semibold',
      'shadow-sm hover:shadow-md',
      props.class
    )"
  >
    <slot />
  </CollapsibleTrigger>
</template>