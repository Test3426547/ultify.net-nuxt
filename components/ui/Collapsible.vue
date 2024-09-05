<template>
    <div :class="['space-y-2', props.class]">
      <slot></slot>
    </div>
  </template>
  
  <script setup lang="ts">
  import { provide, ref } from 'vue'
  
  const props = defineProps<{
    class?: string
  }>()
  
  const isOpen = ref(false)
  
  const toggle = () => {
    isOpen.value = !isOpen.value
  }
  
  provide('collapsible', {
    isOpen,
    toggle
  })
  </script>