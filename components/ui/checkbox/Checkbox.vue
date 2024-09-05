<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import type { CheckboxRootEmits, CheckboxRootProps } from 'radix-vue'
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from 'radix-vue'
import { Check } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const props = defineProps<CheckboxRootProps & { class?: HTMLAttributes['class'] }>()
const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <CheckboxRoot
    v-bind="forwarded"
    :class="
      cn('peer h-6 w-6 shrink-0 rounded-full border-2 border-ultify-grey ring-offset-background transition-all duration-300 ease-in-out',
         'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2',
         'disabled:cursor-not-allowed disabled:opacity-50',
         'data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500',
         'hover:border-emerald-500',
         props.class)"
  >
    <CheckboxIndicator class="flex h-full w-full items-center justify-center text-white">
      <slot>
        <Check class="h-4 w-4 stroke-[3]" />
      </slot>
    </CheckboxIndicator>
  </CheckboxRoot>
</template>