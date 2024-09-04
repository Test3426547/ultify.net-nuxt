<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-3xl border border-gray-200 bg-white text-gray-900 shadow-lg', props.class)">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

export const Card = defineComponent({
  name: 'Card',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: cn('rounded-3xl border border-gray-200 bg-white text-gray-900 shadow-lg', props.class),
    }, slots.default?.())
  },
})

export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { slots }) {
    return () => h('div', { class: 'flex flex-col space-y-1.5 p-8' }, slots.default?.())
  },
})

export const CardTitle = defineComponent({
  name: 'CardTitle',
  setup(_, { slots }) {
    return () => h('h3', { class: 'text-2xl font-bold leading-none tracking-tight text-gray-900' }, slots.default?.())
  },
})

export const CardDescription = defineComponent({
  name: 'CardDescription',
  setup(_, { slots }) {
    return () => h('p', { class: 'text-base text-gray-600' }, slots.default?.())
  },
})

export const CardContent = defineComponent({
  name: 'CardContent',
  setup(_, { slots }) {
    return () => h('div', { class: 'p-8 pt-0' }, slots.default?.())
  },
})

export const CardFooter = defineComponent({
  name: 'CardFooter',
  setup(_, { slots }) {
    return () => h('div', { class: 'flex items-center p-8 pt-0' }, slots.default?.())
  },
})
</script>