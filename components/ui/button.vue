<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  variant?: 'default' | 'outline' | 'secondary'
}>()
</script>

<template>
  <button
    :class="cn(
      'inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ultify-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      {
        'bg-ultify-blue text-white hover:bg-ultify-blue/90': props.variant === 'default',
        'border-2 border-ultify-blue bg-transparent text-ultify-blue hover:bg-ultify-blue/10': props.variant === 'outline',
        'bg-ultify-grey text-ultify-blue hover:bg-ultify-grey/90': props.variant === 'secondary',
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
      type: String as () => 'default' | 'outline' | 'secondary',
      default: 'default'
    }
  },
  setup(props, { slots }) {
    return () => h('button', {
      class: cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ultify-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        {
          'bg-ultify-blue text-white hover:bg-ultify-blue/90': props.variant === 'default',
          'border-2 border-ultify-blue bg-transparent text-ultify-blue hover:bg-ultify-blue/10': props.variant === 'outline',
          'bg-ultify-grey text-ultify-blue hover:bg-ultify-grey/90': props.variant === 'secondary',
        },
        props.class
      )
    }, slots.default?.())
  }
})
</script>