<!-- components/ToastDemo.vue -->
<template>
    <div>
      <Button @click="showToastDemo">Add to calendar</Button>
      <Toast
        v-if="isVisible"
        :title="toastOptions?.title || ''"
        :description="toastOptions?.description || ''"
        :actionText="toastOptions?.actionText || ''"
        :duration="toastOptions?.duration"
        @action="handleAction"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Button } from '@/components/ui/button'
  import { Toast } from '@/components/ui/toast/toast.vue'
  import { useToast } from '@/composables/useToast'
  
  const { isVisible, toastOptions, showToast } = useToast()
  
  const showToastDemo = () => {
    showToast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      actionText: "Try Again",
      duration: 5000
    })
  }
  
  const handleAction = () => {
    console.log("Action button clicked")
    // Add your logic here
  }
  </script>