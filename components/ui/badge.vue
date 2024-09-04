<script setup lang="ts">
import { computed } from 'vue'

interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'default'
})

const badgeClasses = computed(() => {
  return [
    'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
    {
      'bg-primary text-primary-foreground hover:bg-primary/80': props.variant === 'default',
      'bg-secondary text-secondary-foreground hover:bg-secondary/80': props.variant === 'secondary',
      'bg-destructive text-destructive-foreground hover:bg-destructive/80': props.variant === 'destructive',
      'text-foreground': props.variant === 'outline',
    }
  ]
})
</script>

<template>
  <div :class="badgeClasses">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export const Badge = defineComponent({
  name: 'Badge',
  props: {
    variant: {
      type: String as () => 'default' | 'secondary' | 'destructive' | 'outline',
      default: 'default'
    }
  },
  setup(props, { slots }) {
    const badgeClasses = computed(() => [
      'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      {
        'bg-primary text-primary-foreground hover:bg-primary/80': props.variant === 'default',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80': props.variant === 'secondary',
        'bg-destructive text-destructive-foreground hover:bg-destructive/80': props.variant === 'destructive',
        'text-foreground': props.variant === 'outline',
      }
    ])

    return () => h('div', { class: badgeClasses.value }, slots.default?.())
  }
})
</script>