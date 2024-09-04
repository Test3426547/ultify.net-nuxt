<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export const Card = defineComponent({
  name: 'Card',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class),
    }, slots.default?.())
  },
})

export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { slots }) {
    return () => h('div', { class: 'flex flex-col space-y-1.5 p-6' }, slots.default?.())
  },
})

export const CardTitle = defineComponent({
  name: 'CardTitle',
  setup(_, { slots }) {
    return () => h('h3', { class: 'text-2xl font-semibold leading-none tracking-tight' }, slots.default?.())
  },
})

export const CardDescription = defineComponent({
  name: 'CardDescription',
  setup(_, { slots }) {
    return () => h('p', { class: 'text-sm text-muted-foreground' }, slots.default?.())
  },
})

export const CardContent = defineComponent({
  name: 'CardContent',
  setup(_, { slots }) {
    return () => h('div', { class: 'p-6 pt-0' }, slots.default?.())
  },
})

export const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { slots }) {
    return () => h('div', { class: 'flex items-center p-6 pt-0' }, slots.default?.())
  },
})
</script>