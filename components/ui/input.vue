<!-- input.vue -->
<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: string
  id?: string
  placeholder?: string
}>()
</script>

<template>
  <input
    :id="props.id"
    :placeholder="props.placeholder"
    :class="cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      props.class
    )"
  />
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { cn } from '@/lib/utils'

export const Input = defineComponent({
  name: 'Input',
  props: {
    class: String,
    id: String,
    placeholder: String
  },
  setup(props) {
    return () => h('input', {
      id: props.id,
      placeholder: props.placeholder,
      class: cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    })
  }
})
</script>