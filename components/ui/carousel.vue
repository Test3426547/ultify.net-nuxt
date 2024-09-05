<script setup lang="ts">
import { ref, provide } from 'vue'
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
import { defineComponent, h } from 'vue'

export const Carousel = defineComponent({
  name: 'Carousel',
  props: {
    opts: Object,
    orientation: {
      type: String as () => 'horizontal' | 'vertical',
      default: 'horizontal'
    },
    class: String
  },
  setup(props, { slots }) {
    const api = ref(null)
    provide('carousel', api)

    const prevSlide = () => {
      api.value?.scrollPrev()
    }

    const nextSlide = () => {
      api.value?.scrollNext()
    }

    return () => h('div', { class: ['relative', props.class] }, [
      slots.default?.({ api: api.value }),
      props.orientation === 'vertical'
        ? h('div', { class: 'absolute -left-12 top-1/2 -translate-y-1/2 flex flex-col gap-2' }, [
            h(CarouselPrevious, { onClick: prevSlide }),
            h(CarouselNext, { onClick: nextSlide })
          ])
        : h('div', { class: 'absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2' }, [
            h(CarouselPrevious, { onClick: prevSlide }),
            h(CarouselNext, { onClick: nextSlide })
          ])
    ])
  }
})

export const CarouselContent = defineComponent({
  name: 'CarouselContent',
  setup(_, { slots }) {
    return () => h('div', { class: 'overflow-hidden' }, slots.default?.())
  },
})

export const CarouselItem = defineComponent({
  name: 'CarouselItem',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => h('div', { class: ['flex-shrink-0', props.class] }, slots.default?.())
  },
})

export const CarouselPrevious = defineComponent({
  name: 'CarouselPrevious',
  setup(_, { emit }) {
    return () => h('button', {
      class: 'p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none',
      onClick: () => emit('click'),
    }, h(ChevronUp, { class: 'w-6 h-6' }))
  },
})

export const CarouselNext = defineComponent({
  name: 'CarouselNext',
  setup(_, { emit }) {
    return () => h('button', {
      class: 'p-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 focus:outline-none',
      onClick: () => emit('click'),
    }, h(ChevronDown, { class: 'w-6 h-6' }))
  },
})

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }
</script>