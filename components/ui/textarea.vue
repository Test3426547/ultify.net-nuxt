<template>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
    ></textarea>
  </template>
  
  <script setup lang="ts">
  defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: 'Type your message here.',
    },
    rows: {
      type: Number,
      default: 4,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })
  
  defineEmits(['update:modelValue'])
  </script>