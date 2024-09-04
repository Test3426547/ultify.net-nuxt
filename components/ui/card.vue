<script setup lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="cn('rounded-3xl bg-ultify-grey text-ultify-dark-grey shadow-lg', props.class)">
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
      class: cn('rounded-3xl bg-ultify-grey text-ultify-dark-grey shadow-lg', props.class),
    }, slots.default?.())
  },
})

export const CardHeader = defineComponent({
  name: 'CardHeader',
  setup(_, { slots }) {
    return () => h('div', { class: 'flex flex-col space-y-2 p-8' }, slots.default?.())
  },
})

export const CardTitle = defineComponent({
  name: 'CardTitle',
  setup(_, { slots }) {
    return () => h('h3', { class: 'text-3xl font-bold leading-tight text-ultify-blue' }, slots.default?.())
  },
})

export const CardDescription = defineComponent({
  name: 'CardDescription',
  setup(_, { slots }) {
    return () => h('p', { class: 'text-base text-ultify-dark-grey/80' }, slots.default?.())
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
    return () => h('div', { class: 'flex items-center justify-end p-8 pt-0' }, slots.default?.())
  },
})
</script>