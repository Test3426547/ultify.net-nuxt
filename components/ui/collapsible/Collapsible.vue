<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CollapsibleRootProps & {
  class?: string
}>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <CollapsibleRoot 
    v-slot="{ open }" 
    v-bind="forwarded"
    :class="cn(
      'rounded-full overflow-hidden transition-all duration-300 ease-in-out',
      'bg-white border-2 border-ultify-grey',
      'hover:border-emerald-500',
      open ? 'shadow-md' : 'shadow-sm',
      props.class
    )"
  >
    <div class="p-4">
      <slot :open="open" />
    </div>
  </CollapsibleRoot>
</template>