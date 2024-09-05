<script setup lang="ts">
import { computed } from 'vue'
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue'
import { type ToastProps } from '.'
import { cn } from '@/lib/utils'

const props = defineProps<ToastProps>()

const emits = defineEmits<ToastRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const toastVariants = computed(() => ({
  base: 'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-[1.5rem] border-2 border-ultify-grey bg-white p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  variant: {
    default: 'border-ultify-grey bg-white text-ultify-dark-grey',
    destructive: 'destructive group border-red-500 bg-red-500 text-white',
  },
}))
</script>

<template>
  <ToastRoot
    v-bind="forwarded"
    :class="cn(toastVariants.base, toastVariants.variant[props.variant || 'default'], props.class)"
    @update:open="emits('update:open', $event)"
  >
    <slot />
  </ToastRoot>
</template>