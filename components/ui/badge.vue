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
    'inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2',
    {
      'bg-ultify-blue text-white hover:bg-ultify-blue/90': props.variant === 'default',
      'bg-ultify-grey text-ultify-blue hover:bg-ultify-grey/90': props.variant === 'secondary',
      'bg-red-500 text-white hover:bg-red-600': props.variant === 'destructive',
      'border-ultify-blue text-ultify-blue': props.variant === 'outline',
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
import { defineComponent, h, computed } from 'vue'

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
      'inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2',
      {
        'bg-ultify-blue text-white hover:bg-ultify-blue/90': props.variant === 'default',
        'bg-ultify-grey text-ultify-blue hover:bg-ultify-grey/90': props.variant === 'secondary',
        'bg-red-500 text-white hover:bg-red-600': props.variant === 'destructive',
        'border-ultify-blue text-ultify-blue': props.variant === 'outline',
      }
    ])

    return () => h('div', { class: badgeClasses.value }, slots.default?.())
  }
})
</script>