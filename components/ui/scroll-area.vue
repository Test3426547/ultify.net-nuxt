<template>
  <div ref="scrollArea" class="relative overflow-hidden" :class="className">
    <div ref="viewport" class="overflow-auto h-full w-full scrollbar-hide">
      <div ref="content" class="min-h-full">
        <slot></slot>
      </div>
    </div>
    <div ref="scrollbar" class="absolute top-0 right-0 w-2 h-full transition-opacity duration-300" :class="{ 'opacity-0': !isScrollbarVisible, 'opacity-100': isScrollbarVisible }">
      <div ref="thumb" class="bg-gray-400 rounded-full w-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  className?: string
}>()

const scrollArea = ref<HTMLElement | null>(null)
const viewport = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const scrollbar = ref<HTMLElement | null>(null)
const thumb = ref<HTMLElement | null>(null)

const isScrollbarVisible = ref(false)

let isScrolling = false
let startY = 0
let startScrollTop = 0
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  updateScrollbar()
  window.addEventListener('resize', updateScrollbar)
  if (viewport.value) {
    viewport.value.addEventListener('scroll', onScroll)
    viewport.value.addEventListener('mouseenter', showScrollbar)
    viewport.value.addEventListener('mouseleave', hideScrollbar)
  }
  if (thumb.value) {
    thumb.value.addEventListener('mousedown', startDragging)
    thumb.value.addEventListener('touchstart', startDragging)
  }
  
  resizeObserver = new ResizeObserver(updateScrollbar)
  if (content.value) {
    resizeObserver.observe(content.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScrollbar)
  if (viewport.value) {
    viewport.value.removeEventListener('scroll', onScroll)
    viewport.value.removeEventListener('mouseenter', showScrollbar)
    viewport.value.removeEventListener('mouseleave', hideScrollbar)
  }
  if (thumb.value) {
    thumb.value.removeEventListener('mousedown', startDragging)
    thumb.value.removeEventListener('touchstart', startDragging)
  }
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDragging)
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDragging)
  
  if (resizeObserver && content.value) {
    resizeObserver.unobserve(content.value)
    resizeObserver.disconnect()
  }
})

function updateScrollbar() {
  if (viewport.value && content.value && scrollbar.value && thumb.value) {
    const viewportHeight = viewport.value.clientHeight
    const contentHeight = content.value.scrollHeight
    const scrollPercentage = viewport.value.scrollTop / (contentHeight - viewportHeight)
    const thumbHeight = Math.max(20, (viewportHeight / contentHeight) * viewportHeight)
    
    isScrollbarVisible.value = contentHeight > viewportHeight
    
    thumb.value.style.height = `${thumbHeight}px`
    thumb.value.style.transform = `translateY(${scrollPercentage * (viewportHeight - thumbHeight)}px)`
  }
}

function onScroll() {
  updateScrollbar()
  showScrollbar()
}

function showScrollbar() {
  isScrollbarVisible.value = true
}

function hideScrollbar() {
  if (!isScrolling) {
    isScrollbarVisible.value = false
  }
}

function startDragging(e: MouseEvent | TouchEvent) {
  e.preventDefault()
  isScrolling = true
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  startY = clientY - (thumb.value?.offsetTop || 0)
  startScrollTop = viewport.value?.scrollTop || 0
  
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDragging)
  document.addEventListener('touchmove', onDrag)
  document.addEventListener('touchend', stopDragging)
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isScrolling || !viewport.value || !content.value || !scrollbar.value) return
  
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
  const deltaY = clientY - startY
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
  document.removeEventListener('touchmove', onDrag)
  document.removeEventListener('touchend', stopDragging)
  hideScrollbar()
}

watch(() => props.className, updateScrollbar)
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>