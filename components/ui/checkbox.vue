<!-- components/ui/checkbox/checkbox.vue -->
<template>
    <div class="relative inline-flex items-center">
      <input
        type="checkbox"
        :id="id"
        :checked="modelValue"
        @change="$emit('update:modelValue', $event.target.checked)"
        class="peer h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-2 appearance-none cursor-pointer"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
        :disabled="disabled"
      />
      <div
        class="absolute left-0 top-0 h-4 w-4 rounded border border-gray-300 bg-white peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-focus:ring-2 peer-focus:ring-emerald-500 peer-focus:ring-offset-2 pointer-events-none"
      ></div>
      <svg
        class="absolute left-0 top-0 h-4 w-4 text-white pointer-events-none opacity-0 peer-checked:opacity-100"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    id: string
    modelValue: boolean
    disabled?: boolean
  }>()
  
  defineEmits(['update:modelValue'])
  </script>