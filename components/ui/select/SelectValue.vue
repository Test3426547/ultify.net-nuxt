<script setup lang="ts">
import { SelectValue, type SelectValueProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectValueProps & {
  class?: string
}>()
</script>

<template>
  <SelectValue 
    v-bind="props"
    :class="cn(
      'block truncate',
      'text-sm font-medium',
      'text-ultify-dark-grey',
      'placeholder:text-ultify-grey',
      'transition-colors duration-300 ease-in-out',
      props.class
    )"
  >
    <slot />
  </SelectValue>
</template>