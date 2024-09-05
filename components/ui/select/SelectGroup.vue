<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { SelectGroup, type SelectGroupProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<SelectGroupProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})
</script>

<template>
  <SelectGroup 
    :class="cn(
      'p-2 w-full',
      'rounded-[1.5rem]',
      'bg-white',
      'border-2 border-ultify-grey',
      'transition-all duration-300 ease-in-out',
      'hover:border-emerald-500',
      props.class
    )" 
    v-bind="delegatedProps"
  >
    <div class="text-sm font-semibold text-ultify-dark-grey mb-2 px-4">
      {{ props.label }}
    </div>
    <div class="space-y-1">
      <slot />
    </div>
  </SelectGroup>
</template>