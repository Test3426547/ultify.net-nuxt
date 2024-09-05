<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div 
    :class="cn(
      'flex flex-col gap-y-1.5 p-6',
      'bg-white rounded-[2rem] shadow-md',
      'border border-ultify-grey',
      'transition-all duration-300 ease-in-out',
      'hover:border-emerald-500',
      props.class
    )"
  >
    <slot />
  </div>
</template>