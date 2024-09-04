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
      'flex h-14 w-full rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-base text-gray-700 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-ultify-blue focus-visible:ring-2 focus-visible:ring-ultify-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
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
        'flex h-14 w-full rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-base text-gray-700 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:border-ultify-blue focus-visible:ring-2 focus-visible:ring-ultify-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        props.class
      )
    })
  }
})
</script>