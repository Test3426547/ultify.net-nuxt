<script setup lang="ts">
import { ref } from 'vue'
import { cn } from '@/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'

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
        'flex h-14 w-full items-center justify-between rounded-full border border-gray-300 bg-white px-6 py-4 text-base text-gray-700 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200',
        props.class
      )"
    >
      <span>{{ selectedValue || props.placeholder }}</span>
      <ChevronDownIcon class="h-5 w-5 text-gray-500" :class="{ 'transform rotate-180': isOpen }" />
    </button>
    <div v-if="isOpen" class="absolute mt-2 w-full rounded-2xl border border-gray-300 bg-white p-2 shadow-lg z-10">
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
      class: 'relative flex cursor-pointer select-none items-center rounded-full py-3 px-5 text-base text-gray-700 outline-none hover:bg-gray-100 focus:bg-gray-100 transition-colors duration-200',
      onClick: () => props.value,
    }, slots.default?.())
  },
})
</script>