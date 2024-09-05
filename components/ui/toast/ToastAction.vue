<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastAction, type ToastActionProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastActionProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ToastAction 
    v-bind="delegatedProps" 
    :class="cn(
      'inline-flex h-10 shrink-0 items-center justify-center',
      'rounded-full',
      'border-2 border-emerald-500',
      'bg-white',
      'px-6 py-2',
      'text-sm font-medium text-emerald-500',
      'transition-all duration-300 ease-in-out',
      'hover:bg-emerald-500 hover:text-white',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'group-[.destructive]:border-red-500 group-[.destructive]:text-red-500',
      'group-[.destructive]:hover:border-red-500 group-[.destructive]:hover:bg-red-500 group-[.destructive]:hover:text-white',
      'group-[.destructive]:focus:ring-red-500',
      props.class
    )"
  >
    <slot />
  </ToastAction>
</template>