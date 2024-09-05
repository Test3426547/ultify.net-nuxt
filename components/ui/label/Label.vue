<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { Label, type LabelProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<LabelProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <Label
    v-bind="delegatedProps"
    :class="
      cn(
        'text-sm font-semibold leading-relaxed',
        'text-ultify-dark-grey',
        'mb-2 block',
        'transition-colors duration-300 ease-in-out',
        'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        'peer-focus:text-emerald-500',
        props.class,
      )
    "
  >
    <slot />
  </Label>
</template>