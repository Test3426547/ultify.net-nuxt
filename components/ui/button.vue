<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  variant?: 'default' | 'outline'
}>()
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-primary text-primary-foreground hover:bg-primary/90': props.variant === 'default',
        'border border-input bg-background hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
      },
      props.class
    )"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

export const Button = defineComponent({
  name: 'Button',
  props: {
    class: String,
    variant: {
      type: String as () => 'default' | 'outline',
      default: 'default'
    }
  },
  setup(props, { slots }) {
    return () => h('button', {
      class: cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': props.variant === 'default',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': props.variant === 'outline',
        },
        props.class
      )
    }, slots.default?.())
  }
})
</script>