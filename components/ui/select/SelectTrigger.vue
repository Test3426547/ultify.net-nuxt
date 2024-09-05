<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectTriggerProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'flex h-12 w-full items-center justify-between',
      'rounded-full',
      'border-2 border-ultify-grey',
      'bg-white',
      'px-6 py-2',
      'text-sm font-medium text-ultify-dark-grey',
      'ring-offset-background',
      'placeholder:text-ultify-grey',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2',
      'hover:border-emerald-500',
      'disabled:cursor-not-allowed disabled:opacity-50',
      '[&>span]:truncate',
      'text-start',
      'transition-all duration-300 ease-in-out',
      props.class,
    )"
  >
    <slot />
    <SelectIcon as-child>
      <ChevronDown class="w-5 h-5 text-emerald-500 shrink-0" />
    </SelectIcon>
  </SelectTrigger>
</template>