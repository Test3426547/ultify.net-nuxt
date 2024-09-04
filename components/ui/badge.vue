<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'outline'
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
})

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
      'bg-gray-900 text-white hover:bg-gray-800': props.variant === 'default',
      'bg-gray-200 text-gray-800 hover:bg-gray-300': props.variant === 'secondary',
      'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100': props.variant === 'outline',
    },
    props.class
  )
})
</script>

<template>
  <div :class="badgeClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, computed } from 'vue'
import { cn } from '@/lib/utils'

export const Badge = defineComponent({
  name: 'Badge',
  props: {
    variant: {
      type: String as () => 'default' | 'secondary' | 'outline',
      default: 'default'
    },
    class: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    const badgeClasses = computed(() => 
      cn(
        'inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        {
          'bg-gray-900 text-white hover:bg-gray-800': props.variant === 'default',
          'bg-gray-200 text-gray-800 hover:bg-gray-300': props.variant === 'secondary',
          'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100': props.variant === 'outline',
        },
        props.class
      )
    )

    return () => h('div', { class: badgeClasses.value }, slots.default?.())
  }
})
</script>