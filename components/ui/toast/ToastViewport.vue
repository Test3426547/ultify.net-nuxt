<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastViewport, type ToastViewportProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastViewportProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastViewport 
    v-bind="delegatedProps" 
    :class="cn(
      'fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4',
      'bottom-0 right-0 top-auto',
      'sm:max-w-[420px]',
      'md:max-w-[480px]',
      'transition-all duration-300 ease-in-out',
      props.class
    )" 
  />
</template>