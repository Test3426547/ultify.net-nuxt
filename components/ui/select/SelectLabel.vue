<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectLabel, type SelectLabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectLabelProps & { class?: HTMLAttributes['class'] }>()
</script>

<template>
  <SelectLabel 
    :class="cn(
      'py-2 px-6',
      'text-sm font-semibold',
      'text-emerald-500',
      'bg-emerald-50',
      'rounded-full',
      'mb-2',
      'block',
      'transition-colors duration-300 ease-in-out',
      'hover:bg-emerald-100',
      props.class
    )"
  >
    <slot />
  </SelectLabel>
</template>