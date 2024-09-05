<template>
    <div ref="scrollAreaRef" class="overflow-hidden">
      <div ref="viewportRef" class="h-full w-full overflow-auto">
        <div ref="contentRef" class="min-w-full inline-block">
          <slot></slot>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps<{
    class?: string
  }>()
  
  const scrollAreaRef = ref<HTMLElement | null>(null)
  const viewportRef = ref<HTMLElement | null>(null)
  const contentRef = ref<HTMLElement | null>(null)
  
  let resizeObserver: ResizeObserver | null = null
  
  onMounted(() => {
    if (contentRef.value) {
      resizeObserver = new ResizeObserver(() => {
        updateScrollArea()
      })
      resizeObserver.observe(contentRef.value)
    }
    updateScrollArea()
  })
  
  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect()
    }
  })
  
  function updateScrollArea() {
    if (scrollAreaRef.value && viewportRef.value && contentRef.value) {
      const { clientWidth, clientHeight } = scrollAreaRef.value
      const { scrollWidth, scrollHeight } = contentRef.value
  
      viewportRef.value.style.width = `${clientWidth + (scrollWidth - clientWidth)}px`
      viewportRef.value.style.height = `${clientHeight + (scrollHeight - clientHeight)}px`
    }
  }
  
  // Add this line at the end of the <script setup> section
  defineExpose({ scrollAreaRef, viewportRef, contentRef, updateScrollArea })
  </script>
  
  <style scoped>
  .overflow-hidden {
    overflow: hidden;
  }
  
  .overflow-auto {
    overflow: auto;
  }
  
  .h-full {
    height: 100%;
  }
  
  .w-full {
    width: 100%;
  }
  
  .min-w-full {
    min-width: 100%;
  }
  
  .inline-block {
    display: inline-block;
  }
  </style>