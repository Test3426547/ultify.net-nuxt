<!-- components/ui/toast/toast.vue -->
<template>
    <div
      v-if="isVisible"
      class="fixed bottom-4 right-4 w-full max-w-sm bg-white rounded-full shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform translate-y-0 opacity-100"
      :class="{ 'translate-y-full opacity-0': !isVisible }"
    >
      <div class="p-4 flex items-center justify-between">
        <div>
          <h3 class="font-semibold text-gray-900">{{ title }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ description }}</p>
        </div>
        <button
          @click="onAction"
          class="ml-4 px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-200"
        >
          {{ actionText }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  
  interface ToastProps {
    title: string
    description: string
    actionText: string
    duration?: number
  }
  
  const props = withDefaults(defineProps<ToastProps>(), {
    duration: 5000
  })
  
  const isVisible = ref(false)
  let timeoutId: number | null = null
  
  const emit = defineEmits(['action'])
  
  const onAction = () => {
    emit('action')
    hideToast()
  }
  
  const showToast = () => {
    isVisible.value = true
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(hideToast, props.duration)
  }
  
  const hideToast = () => {
    isVisible.value = false
  }
  
  onMounted(() => {
    showToast()
  })
  
  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
  })
  </script>