<template>
    <div class="relative w-full max-w-xl">
      <div class="overflow-hidden rounded-3xl bg-transparent">
        <div
          ref="carouselContent"
          class="transition-transform duration-300 ease-in-out"
          :style="{ transform: `translateY(-${currentIndex * 100}%)` }"
        >
          <slot></slot>
        </div>
      </div>
      <button
        @click="prevSlide"
        class="absolute -left-16 top-1/2 -translate-y-1/2 p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>
      <button
        @click="nextSlide"
        class="absolute -right-16 top-1/2 -translate-y-1/2 p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  const props = defineProps({
    autoPlay: {
      type: Boolean,
      default: false
    },
    interval: {
      type: Number,
      default: 3000
    }
  })
  
  const carouselContent = ref<HTMLElement | null>(null)
  const currentIndex = ref(0)
  let intervalId: number | null = null
  
  const slideCount = ref(0)
  
  onMounted(() => {
    if (carouselContent.value) {
      slideCount.value = carouselContent.value.children.length
    }
  
    if (props.autoPlay) {
      startAutoPlay()
    }
  })
  
  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slideCount.value
  }
  
  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + slideCount.value) % slideCount.value
  }
  
  const startAutoPlay = () => {
    intervalId = setInterval(nextSlide, props.interval)
  }
  
  const stopAutoPlay = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  }
  
  defineExpose({
    nextSlide,
    prevSlide,
    startAutoPlay,
    stopAutoPlay
  })
  </script>
  
  <style scoped>
  /* Add any additional styles here */
  </style>