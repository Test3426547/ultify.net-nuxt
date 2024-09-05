<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectSeparator 
    v-bind="delegatedProps" 
    :class="cn(
      'mx-2 my-2',
      'h-px',
      'bg-emerald-200',
      'rounded-full',
      'opacity-50',
      'transition-opacity duration-300 ease-in-out',
      props.class
    )" 
  />
</template>