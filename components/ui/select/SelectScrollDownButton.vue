<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectScrollDownButton, type SelectScrollDownButtonProps, useForwardProps } from 'radix-vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectScrollDownButtonProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectScrollDownButton 
    v-bind="forwardedProps" 
    :class="cn(
      'flex items-center justify-center',
      'w-full py-2',
      'bg-white hover:bg-emerald-50',
      'text-ultify-grey hover:text-emerald-500',
      'transition-colors duration-300 ease-in-out',
      'cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset',
      'rounded-b-[1.5rem]',
      props.class
    )"
  >
    <slot>
      <ChevronDown class="h-5 w-5" />
    </slot>
  </SelectScrollDownButton>
</template>