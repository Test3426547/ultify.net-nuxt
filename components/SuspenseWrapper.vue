<template>
    <Suspense>
      <template #default>
        <slot></slot>
      </template>
      <template #fallback>
        <slot name="fallback">
          <div>{{ defaultFallback }}</div>
        </slot>
      </template>
    </Suspense>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    defaultFallback: {
      type: String,
      default: 'Loading...'
    }
  })
  </script>