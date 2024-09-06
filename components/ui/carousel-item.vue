<template>
    <div class="flex-shrink-0 w-full pt-1 md:basis-1/2">
      <div class="p-1">
        <slot></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { inject, onMounted } from 'vue'
  
  const registerItem = inject('registerItem') as () => void
  
  onMounted(() => {
    registerItem()
  })
  </script>