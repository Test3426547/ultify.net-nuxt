<script setup lang="ts">
import type { SelectRootEmits, SelectRootProps } from 'radix-vue'
import { SelectRoot, useForwardPropsEmits } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectRootProps & {
  class?: string
}>()
const emits = defineEmits<SelectRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <SelectRoot 
    v-bind="forwarded"
    :class="cn(
      'relative inline-block w-full',
      'text-left',
      props.class
    )"
  >
    <slot />
  </SelectRoot>
</template>

<style scoped>
:global(.select-trigger) {
  @apply flex items-center justify-between w-full px-6 py-3 text-sm;
  @apply bg-white border-2 border-ultify-grey rounded-full;
  @apply text-ultify-dark-grey;
  @apply hover:border-emerald-500;
  @apply focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500;
  @apply transition-all duration-300 ease-in-out;
}

:global(.select-content) {
  @apply bg-white border-2 border-ultify-grey rounded-[1.5rem];
  @apply shadow-lg;
  @apply overflow-hidden;
  @apply mt-2;
}

:global(.select-item) {
  @apply flex items-center px-6 py-2 text-sm;
  @apply text-ultify-dark-grey;
  @apply hover:bg-emerald-50 hover:text-emerald-500;
  @apply cursor-pointer;
  @apply transition-colors duration-200 ease-in-out;
}

:global(.select-item[data-highlighted]) {
  @apply bg-emerald-50 text-emerald-500;
}

:global(.select-item[data-disabled]) {
  @apply opacity-50 cursor-not-allowed;
}
</style>