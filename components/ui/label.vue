<!-- label.vue -->
<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  htmlFor?: string
}>()
</script>

<template>
  <label
    :for="props.htmlFor"
    :class="cn('text-base font-medium leading-none text-gray-700 mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class)"
  >
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

export const Label = defineComponent({
  name: 'Label',
  props: {
    class: String,
    htmlFor: String,
  },
  setup(props, { slots }) {
    return () => h('label', {
      for: props.htmlFor,
      class: cn('text-base font-medium leading-none text-gray-700 mb-2 block peer-disabled:cursor-not-allowed peer-disabled:opacity-70', props.class),
    }, slots.default?.())
  },
})
</script>