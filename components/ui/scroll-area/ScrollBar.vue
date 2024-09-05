<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = withDefaults(defineProps<ScrollAreaScrollbarProps & { class?: HTMLAttributes['class'] }>(), {
  orientation: 'vertical',
})

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="delegatedProps"
    :class="
      cn('flex touch-none select-none transition-all duration-300 ease-in-out',
         orientation === 'vertical'
           && 'h-full w-3 border-l border-l-transparent p-px',
         orientation === 'horizontal'
           && 'h-3 flex-col border-t border-t-transparent p-px',
         props.class)"
  >
    <ScrollAreaThumb 
      :class="cn(
        'relative flex-1 rounded-full',
        'bg-ultify-grey hover:bg-emerald-500',
        'transition-colors duration-300 ease-in-out',
        'cursor-pointer'
      )"
    />
  </ScrollAreaScrollbar>
</template>