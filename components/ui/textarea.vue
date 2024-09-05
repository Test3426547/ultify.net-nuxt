<!-- components/ui/textarea/textarea.vue -->
<template>
    <textarea
      :class="[
        'flex min-h-[80px] w-full rounded-full border border-input bg-background px-6 py-4 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      ]"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      v-bind="$attrs"
    ></textarea>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface TextareaProps {
    modelValue?: string
    className?: string
  }
  
  const props = withDefaults(defineProps<TextareaProps>(), {
    modelValue: '',
    className: ''
  })
  
  defineEmits(['update:modelValue'])
  
  const className = computed(() => props.className)
  </script>