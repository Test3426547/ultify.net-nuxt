<template>
    <button @click="toggle" :class="props.class">
      <slot></slot>
    </button>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue'
  
  const props = defineProps<{
    class?: string
  }>()
  
  const { toggle } = inject('collapsible') as { toggle: () => void }
  </script>