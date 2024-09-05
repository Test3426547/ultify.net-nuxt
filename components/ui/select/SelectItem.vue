<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  SelectItem,
  SelectItemIndicator,
  type SelectItemProps,
  SelectItemText,
  useForwardProps,
} from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<SelectItemProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <SelectItem
    v-bind="forwardedProps"
    :class="
      cn(
        'relative flex w-full cursor-pointer select-none items-center',
        'rounded-full py-2 pl-10 pr-4 text-sm',
        'text-ultify-dark-grey',
        'transition-colors duration-300 ease-in-out',
        'outline-none focus:bg-emerald-50 focus:text-emerald-500',
        'hover:bg-emerald-50 hover:text-emerald-500',
        'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class
      )
    "
  >
    <span class="absolute left-3 flex h-5 w-5 items-center justify-center">
      <SelectItemIndicator>
        <Check class="h-4 w-4 text-emerald-500" />
      </SelectItemIndicator>
    </span>

    <SelectItemText>
      <slot />
    </SelectItemText>
  </SelectItem>
</template>