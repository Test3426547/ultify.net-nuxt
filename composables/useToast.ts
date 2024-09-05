// composables/useToast.ts
import { ref } from 'vue'

interface ToastOptions {
  title: string
  description: string
  actionText: string
  duration?: number
}

const isVisible = ref(false)
const toastOptions = ref<ToastOptions | null>(null)

export function useToast() {
  const showToast = (options: ToastOptions) => {
    toastOptions.value = options
    isVisible.value = true
  }

  const hideToast = () => {
    isVisible.value = false
  }

  return {
    isVisible,
    toastOptions,
    showToast,
    hideToast
  }
}