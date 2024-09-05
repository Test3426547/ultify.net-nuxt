<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/lib/utils'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <ScrollAreaRoot 
    v-bind="delegatedProps" 
    :class="cn(
      'relative overflow-hidden',
      'rounded-[2rem] bg-white',
      'border-2 border-ultify-grey',
      'shadow-sm hover:shadow-md',
      'transition-all duration-300 ease-in-out',
      props.class
    )"
  >
    <ScrollAreaViewport class="h-full w-full rounded-[inherit] p-4">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>