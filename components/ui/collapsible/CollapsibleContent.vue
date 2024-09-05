<script setup lang="ts">
import { CollapsibleContent, type CollapsibleContentProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CollapsibleContentProps & {
  class?: string
}>()
</script>

<template>
  <CollapsibleContent 
    v-bind="props" 
    :class="cn(
      'overflow-hidden transition-all duration-300 ease-in-out',
      'bg-white rounded-[1.5rem] mt-2',
      'border-2 border-ultify-grey',
      'shadow-sm hover:shadow-md',
      'data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
      props.class
    )"
  >
    <div class="p-4">
      <slot />
    </div>
  </CollapsibleContent>
</template>

<style scoped>
@keyframes collapsible-down {
  from { height: 0 }
  to { height: var(--radix-collapsible-content-height) }
}

@keyframes collapsible-up {
  from { height: var(--radix-collapsible-content-height) }
  to { height: 0 }
}

.animate-collapsible-down {
  animation: collapsible-down 0.3s ease-out;
}

.animate-collapsible-up {
  animation: collapsible-up 0.3s ease-out;
}
</style>