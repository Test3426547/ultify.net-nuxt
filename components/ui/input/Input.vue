<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <input 
    v-model="modelValue" 
    :class="cn(
      'flex h-12 w-full rounded-full',
      'border-2 border-ultify-grey',
      'bg-white px-6 py-2',
      'text-sm text-ultify-dark-grey',
      'placeholder:text-ultify-grey',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500',
      'hover:border-emerald-500',
      'transition-all duration-300 ease-in-out',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  >
</template>