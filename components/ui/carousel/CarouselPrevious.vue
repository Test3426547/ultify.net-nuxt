<script setup lang="ts">
import { ArrowLeft } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    :class="cn(
      'touch-manipulation absolute rounded-full p-2',
      'bg-emerald-500 hover:bg-emerald-600 text-white',
      'border-2 border-white shadow-md',
      'transition-all duration-300 ease-in-out',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      orientation === 'horizontal'
        ? '-left-6 top-1/2 -translate-y-1/2'
        : '-top-6 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeft class="h-6 w-6" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>