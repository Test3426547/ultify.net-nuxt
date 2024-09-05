<script setup lang="ts">
import { isVNode } from 'vue'
import { useToast } from './use-toast'
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '.'

const { toasts } = useToast()
</script>

<template>
  <ToastProvider>
    <Toast 
      v-for="toast in toasts" 
      :key="toast.id" 
      v-bind="toast"
      class="group flex w-full items-center justify-between space-x-4 overflow-hidden rounded-full border border-emerald-200 bg-white p-4 shadow-lg transition-all hover:border-emerald-300 hover:bg-emerald-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:transition-none data-[state=open]:slide-in-from-top-full data-[state=closed]:fade-out-80 sm:max-w-sm"
    >
      <div class="grid gap-1">
        <ToastTitle 
          v-if="toast.title"
          class="text-sm font-semibold text-gray-900"
        >
          {{ toast.title }}
        </ToastTitle>
        <template v-if="toast.description">
          <ToastDescription 
            v-if="isVNode(toast.description)"
            class="text-sm text-gray-600"
          >
            <component :is="toast.description" />
          </ToastDescription>
          <ToastDescription 
            v-else
            class="text-sm text-gray-600"
          >
            {{ toast.description }}
          </ToastDescription>
        </template>
        <ToastClose />
      </div>
      <component :is="toast.action" />
    </Toast>
    <ToastViewport 
      class="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"
    />
  </ToastProvider>
</template>