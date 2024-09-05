<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn(
      'touch-manipulation absolute rounded-full p-2',
      'bg-emerald-500 hover:bg-emerald-600 text-white',
      'border-2 border-white shadow-md',
      'transition-all duration-300 ease-in-out',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      orientation === 'horizontal'
        ? '-right-6 top-1/2 -translate-y-1/2'
        : '-bottom-6 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    )"
    @click="scrollNext"
  >
    <slot>
      <ArrowRight class="h-6 w-6" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>