<script setup lang="ts">
import { SelectItemText, type SelectItemTextProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemTextProps & {
  class?: string
}>()
</script>

<template>
  <SelectItemText 
    v-bind="props"
    :class="cn(
      'block truncate',
      'text-sm font-medium',
      'text-ultify-dark-grey',
      'transition-colors duration-300 ease-in-out',
      'group-hover:text-emerald-500',
      'group-focus:text-emerald-500',
      props.class
    )"
  >
    <slot />
  </SelectItemText>
</template>