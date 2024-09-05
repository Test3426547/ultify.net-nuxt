<!-- components/CheckboxDemo.vue -->
<template>
    <div class="flex items-center space-x-2">
      <Checkbox id="terms" v-model="isChecked" />
      <label
        for="terms"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { Checkbox } from '@/components/ui/checkbox/checkbox.vue'
  
  const isChecked = ref(false)
  </script>