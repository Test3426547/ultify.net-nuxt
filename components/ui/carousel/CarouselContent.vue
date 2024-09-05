<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'
import { cn } from '@/lib/utils'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<WithClassAsProps>()

const { carouselRef, orientation } = useCarousel()
</script>

<template>
  <div 
    ref="carouselRef" 
    class="overflow-hidden rounded-[2rem] bg-white shadow-md border border-ultify-grey transition-all duration-300 ease-in-out hover:border-emerald-500"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' 
            ? 'space-x-4 px-4' 
            : 'flex-col space-y-4 py-4',
          'relative',
          props.class,
        )"
      v-bind="$attrs"
    >
      <slot />
    </div>
    <div 
      v-if="orientation === 'horizontal'"
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <div 
        v-for="(_, index) in $slots.default?.()" 
        :key="index" 
        class="w-2 h-2 rounded-full bg-ultify-grey transition-all duration-300 ease-in-out"
        :class="{ 'bg-emerald-500': index === 0 }"
      ></div>
    </div>
    <div 
      v-else
      class="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2"
    >
      <div 
        v-for="(_, index) in $slots.default?.()" 
        :key="index" 
        class="w-2 h-2 rounded-full bg-ultify-grey transition-all duration-300 ease-in-out"
        :class="{ 'bg-emerald-500': index === 0 }"
      ></div>
    </div>
  </div>
</template>