<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  defaultValue?: string | number
  modelValue?: string | number
  placeholder?: string
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
  <textarea 
    v-model="modelValue"
    :placeholder="placeholder"
    :class="cn(
      'flex min-h-[120px] w-full',
      'rounded-[1.5rem]',
      'border-2 border-ultify-grey',
      'bg-white',
      'px-6 py-4',
      'text-sm text-ultify-dark-grey',
      'placeholder:text-ultify-grey',
      'ring-offset-background',
      'transition-all duration-300 ease-in-out',
      'focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:border-emerald-500',
      'hover:border-emerald-500',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'resize-vertical',
      props.class
    )"
  />
</template>