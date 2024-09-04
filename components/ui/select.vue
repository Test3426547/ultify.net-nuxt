<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-vue-next'

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
        'flex h-14 w-full items-center justify-between rounded-full border-2 border-ultify-grey bg-white px-6 py-3 text-base text-ultify-dark-grey ring-offset-background placeholder:text-ultify-grey/60 focus:border-ultify-blue focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
        props.class
      )"
    >
      <span>{{ selectedValue || props.placeholder }}</span>
      <ChevronDown class="h-5 w-5 text-ultify-grey" :class="{ 'transform rotate-180': isOpen }" />
    </button>
    <div v-if="isOpen" class="absolute mt-2 w-full rounded-2xl border-2 border-ultify-grey bg-white p-2 shadow-lg">
      <slot @select="select" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

export const Select = defineComponent({
  name: 'Select',
  props: {
    class: String,
    placeholder: String,
  },
  setup(props, { slots }) {
    const isOpen = ref(false)
    const selectedValue = ref('')

    const toggle = () => {
      isOpen.value = !isOpen.value
    }

    const select = (value: string) => {
      selectedValue.value = value
      isOpen.value = false
    }

    return () => h('div', { class: 'relative' }, [
      h('button', {
        onClick: toggle,
        class: cn(
          'flex h-14 w-full items-center justify-between rounded-full border-2 border-ultify-grey bg-white px-6 py-3 text-base text-ultify-dark-grey ring-offset-background placeholder:text-ultify-grey/60 focus:border-ultify-blue focus:outline-none focus:ring-2 focus:ring-ultify-blue focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
          props.class
        )
      }, [
        h('span', selectedValue.value || props.placeholder),
        h(ChevronDown, {
          class: ['h-5 w-5 text-ultify-grey', { 'transform rotate-180': isOpen.value }]
        })
      ]),
      isOpen.value && h('div', {
        class: 'absolute mt-2 w-full rounded-2xl border-2 border-ultify-grey bg-white p-2 shadow-lg'
      }, slots.default?.({ select }))
    ])
  },
})

export const SelectItem = defineComponent({
  props: {
    value: {
      type: String,
      required: true,
    },
  },
  setup(props, { slots }) {
    return () => h('div', {
      class: 'relative flex cursor-pointer select-none items-center rounded-full py-2 px-4 text-base text-ultify-dark-grey outline-none hover:bg-ultify-grey/10 focus:bg-ultify-grey/20 focus:text-ultify-blue data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      onClick: () => props.value,
    }, slots.default?.())
  },
})
</script>