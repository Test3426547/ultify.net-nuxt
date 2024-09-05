<template>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-300 ease-in"
      enter-from-class="opacity-0 max-h-0"
      enter-to-class="opacity-100 max-h-[1000px]"
      leave-from-class="opacity-100 max-h-[1000px]"
      leave-to-class="opacity-0 max-h-0"
    >
      <div v-if="isOpen" :class="['overflow-hidden', props.class]">
        <slot></slot>
      </div>
    </Transition>
  </template>
  
  <script setup lang="ts">
  import { inject } from 'vue'
  
  const props = defineProps<{
    class?: string
  }>()
  
  const { isOpen } = inject('collapsible') as { isOpen: Ref<boolean> }
  </script>