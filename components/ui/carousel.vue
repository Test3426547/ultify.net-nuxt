<script setup lang="ts">
import { ref, provide, defineComponent, h } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  opts?: any
  orientation?: 'horizontal' | 'vertical'
  class?: string
}>()

const api = ref(null)

provide('carousel', api)

const prevSlide = () => {
  api.value?.scrollPrev()
}

const nextSlide = () => {
  api.value?.scrollNext()
}

const CarouselContent = defineComponent({
  name: 'CarouselContent',
  setup(_, { slots }) {
    return () => h('div', { class: 'overflow-hidden' }, slots.default?.())
  },
})

const CarouselItem = defineComponent({
  name: 'CarouselItem',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => h('div', { class: ['flex-shrink-0', props.class] }, slots.default?.())
  },
})

const CarouselPrevious = defineComponent({
  name: 'CarouselPrevious',
  setup(_, { emit }) {
    return () => h('button', {
      class: 'p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none',
      onClick: () => emit('click'),
    }, h(ChevronUp, { class: 'w-6 h-6' }))
  },
})

const CarouselNext = defineComponent({
  name: 'CarouselNext',
  setup(_, { emit }) {
    return () => h('button', {
      class: 'p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none',
      onClick: () => emit('click'),
    }, h(ChevronDown, { class: 'w-6 h-6' }))
  },
})

defineExpose({
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
})
</script>

<template>
  <div :class="['relative', props.class]">
    <slot :api="api"></slot>
    <div v-if="orientation === 'vertical'" class="absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
      <CarouselPrevious @click="prevSlide" />
      <CarouselNext @click="nextSlide" />
    </div>
    <div v-else class="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
      <CarouselPrevious @click="prevSlide" />
      <CarouselNext @click="nextSlide" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Carousel',
}
</script>