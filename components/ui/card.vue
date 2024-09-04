<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()

// Define the Card component
const Card = defineComponent({
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class),
    }, slots.default?.())
  },
})

// Export all components
export { Card }
</script>

<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export const CardHeader = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'flex flex-col space-y-1.5 p-6' }, slots.default?.())
  },
})

export const CardTitle = defineComponent({
  setup(_, { slots }) {
    return () => h('h3', { class: 'text-2xl font-semibold leading-none tracking-tight' }, slots.default?.())
  },
})

export const CardDescription = defineComponent({
  setup(_, { slots }) {
    return () => h('p', { class: 'text-sm text-muted-foreground' }, slots.default?.())
  },
})

export const CardContent = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'p-6 pt-0' }, slots.default?.())
  },
})

export const CardFooter = defineComponent({
  setup(_, { slots }) {
    return () => h('div', { class: 'flex items-center p-6 pt-0' }, slots.default?.())
  },
})
</script>