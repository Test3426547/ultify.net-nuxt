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
      'flex h-14 w-full rounded-full border-2 border-ultify-grey bg-white px-6 py-3 text-base text-ultify-dark-grey placeholder:text-ultify-grey/60 focus:border-ultify-blue focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
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
        'flex h-14 w-full rounded-full border-2 border-ultify-grey bg-white px-6 py-3 text-base text-ultify-dark-grey placeholder:text-ultify-grey/60 focus:border-ultify-blue focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        props.class
      )
    })
  }
})
</script>