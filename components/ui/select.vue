<template>
  <div class="relative inline-block w-full">
    <button
      @click="toggle"
      class="w-full px-4 sm:px-6 py-3 sm:py-4 text-base rounded-full bg-gray-100 text-black hover:bg-gray-200 transition-colors duration-300 flex justify-between items-center"
      :class="{ 'ring-2 ring-emerald-500': isOpen }"
    >
      <span v-if="modelValue" class="text-black">{{ getSelectedLabel }}</span>
      <span v-else class="text-slate-500 text-left">{{ placeholder }}</span>
      <svg
        class="w-4 h-4 ml-2 transition-transform duration-200 text-gray-500 flex-shrink-0"
        :class="{ 'transform rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white rounded-2xl shadow-lg max-h-60 overflow-auto"
      >
        <ul class="py-1">
          <li
            v-for="option in options"
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2 text-base text-black hover:bg-gray-100 cursor-pointer"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  label: string
  value: string | number
}

const props = defineProps<{
  modelValue: string | number
  options: Option[]
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)

const getSelectedLabel = computed(() => {
  const selected = props.options.find(option => option.value === props.modelValue)
  return selected ? selected.label : ''
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

// Close dropdown when clicking outside
const closeOnClickOutside = (e: MouseEvent) => {
  if (isOpen.value && !(e.target as HTMLElement).closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

<style scoped>
.relative {
  height: 46px;
}

button {
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
}

button span {
  flex-grow: 1;
  text-align: left;
  padding-left: 0;
}

.text-slate-500 {
  color: #64748B;
}
</style>