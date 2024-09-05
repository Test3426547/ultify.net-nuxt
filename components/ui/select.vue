<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  placeholder?: string
}>()

const isOpen = ref(false)
const selectedValue = ref('')

const toggle = () => {
  isOpen.value = !isOpen.value
}

const select = (value: string) => {
  selectedValue.value = value
  isOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      @click="toggle"
      :class="cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )"
    >
      <span>{{ selectedValue || props.placeholder }}</span>
      <span class="ml-2">▼</span>
    </button>
    <div v-if="isOpen" class="absolute mt-2 w-full rounded-md border bg-popover p-1">
      <slot @select="select" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'

export const SelectItem = defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      onClick: () => props.value,
    }, slots.default?.())
  },
})
</script>