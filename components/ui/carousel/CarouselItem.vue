<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

const props = defineProps<WithClassAsProps>()

const { orientation } = useCarousel()
</script>

<template>
  <div
    role="group"
    aria-roledescription="slide"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      'bg-white rounded-[2rem] shadow-sm',
      'border border-ultify-grey',
      'transition-all duration-300 ease-in-out',
      'hover:border-emerald-500 hover:shadow-md',
      orientation === 'horizontal' ? 'mx-2' : 'my-2',
      props.class
    )"
  >
    <div class="p-6">
      <slot />
    </div>
  </div>
</template>