<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastClose, type ToastCloseProps } from 'radix-vue'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<ToastCloseProps & {
  class?: HTMLAttributes['class']
}>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastClose 
    v-bind="delegatedProps" 
    :class="cn(
      'absolute right-2 top-2',
      'rounded-full',
      'p-1.5',
      'text-emerald-500',
      'opacity-0',
      'transition-all duration-300 ease-in-out',
      'hover:bg-emerald-100 hover:text-emerald-600',
      'focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
      'group-hover:opacity-100',
      'group-[.destructive]:text-red-300 group-[.destructive]:hover:bg-red-100 group-[.destructive]:hover:text-red-600',
      'group-[.destructive]:focus:ring-red-500',
      props.class
    )"
  >
    <X class="h-5 w-5" />
  </ToastClose>
</template>