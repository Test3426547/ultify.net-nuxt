<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastTitle, type ToastTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastTitle 
    v-bind="delegatedProps" 
    :class="cn(
      'text-sm',
      'font-semibold',
      'text-gray-900',
      'leading-none',
      'tracking-tight',
      'mb-1',
      'transition-colors duration-300 ease-in-out',
      'group-hover:text-emerald-700',
      'group-[.destructive]:text-red-50',
      props.class
    )"
  >
    <slot />
  </ToastTitle>
</template>