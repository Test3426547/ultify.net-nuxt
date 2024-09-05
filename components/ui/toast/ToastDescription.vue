<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastDescription, type ToastDescriptionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastDescriptionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastDescription 
    :class="cn(
      'text-sm',
      'leading-relaxed',
      'text-gray-600',
      'opacity-90',
      'transition-colors duration-300 ease-in-out',
      'group-hover:text-gray-700',
      'group-[.destructive]:text-red-100 group-[.destructive]:group-hover:text-red-50',
      props.class
    )" 
    v-bind="delegatedProps"
  >
    <slot />
  </ToastDescription>
</template>