<!-- components/ui/scroll-area.vue -->
<template>
    <div ref="scrollArea" class="relative overflow-hidden">
      <div ref="viewport" class="overflow-hidden h-full w-full">
        <div ref="content" class="absolute top-0 left-0 right-0 min-h-full">
          <slot></slot>
        </div>
      </div>
      <div ref="scrollbar" class="absolute top-0 right-0 w-2 h-full transition-opacity duration-300 opacity-0 hover:opacity-100">
        <div ref="thumb" class="bg-gray-400 rounded-full w-full"></div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  const props = defineProps<{
    className?: string
  }>()
  
  const scrollArea = ref<HTMLElement | null>(null)
  const viewport = ref<HTMLElement | null>(null)
  const content = ref<HTMLElement | null>(null)
  const scrollbar = ref<HTMLElement | null>(null)
  const thumb = ref<HTMLElement | null>(null)
  
  let isScrolling = false
  let startY = 0
  let startScrollTop = 0
  
  onMounted(() => {
    updateScrollbar()
    window.addEventListener('resize', updateScrollbar)
    if (viewport.value) {
      viewport.value.addEventListener('scroll', updateScrollbar)
    }
    if (thumb.value) {
      thumb.value.addEventListener('mousedown', startDragging)
    }
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', updateScrollbar)
    if (viewport.value) {
      viewport.value.removeEventListener('scroll', updateScrollbar)
    }
    if (thumb.value) {
      thumb.value.removeEventListener('mousedown', startDragging)
    }
  })
  
  function updateScrollbar() {
    if (viewport.value && content.value && scrollbar.value && thumb.value) {
      const viewportHeight = viewport.value.clientHeight
      const contentHeight = content.value.scrollHeight
      const scrollPercentage = viewport.value.scrollTop / (contentHeight - viewportHeight)
      const thumbHeight = Math.max(20, (viewportHeight / contentHeight) * viewportHeight)
      
      thumb.value.style.height = `${thumbHeight}px`
      thumb.value.style.transform = `translateY(${scrollPercentage * (viewportHeight - thumbHeight)}px)`
    }
  }
  
  function startDragging(e: MouseEvent) {
    isScrolling = true
    startY = e.clientY - (thumb.value?.offsetTop || 0)
    startScrollTop = viewport.value?.scrollTop || 0
    
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDragging)
  }
  
  function onDrag(e: MouseEvent) {
    if (!isScrolling || !viewport.value || !content.value || !scrollbar.value) return
    
    const deltaY = e.clientY - startY
    const scrollbarHeight = scrollbar.value.clientHeight
    const contentHeight = content.value.scrollHeight
    const viewportHeight = viewport.value.clientHeight
    
    const scrollAmount = (deltaY / scrollbarHeight) * contentHeight
    viewport.value.scrollTop = startScrollTop + scrollAmount
  }
  
  function stopDragging() {
    isScrolling = false
    document.removeEventListener('mousemove', onDrag)
    document.removeEventListener('mouseup', stopDragging)
  }
  </script>