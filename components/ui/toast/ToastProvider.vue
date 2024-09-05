<script setup lang="ts">
import { ToastProvider, type ToastProviderProps } from 'radix-vue'

const props = defineProps<ToastProviderProps & {
  swipeDirection?: 'right' | 'left' | 'up' | 'down'
  duration?: number
}>()

const defaultProps = {
  swipeDirection: 'right',
  duration: 5000,
  ...props
}
</script>

<template>
  <ToastProvider v-bind="defaultProps">
    <slot />
  </ToastProvider>
</template>