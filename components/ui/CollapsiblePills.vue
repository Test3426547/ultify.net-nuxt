<template>
    <Collapsible v-model:open="isOpen" class="w-full">
      <CollapsibleTrigger class="w-full">
        <Input 
          v-model="modelValue['url-business-name']"
          placeholder="URL/Business Name"
          class="w-full pl-6 pr-4 py-4 bg-white text-black placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </CollapsibleTrigger>
      <CollapsibleContent class="space-y-4 mt-4">
        <Input 
          v-for="field in fields" 
          :key="field.id"
          v-model="modelValue[field.key]"
          :placeholder="field.placeholder"
          class="w-full pl-6 pr-4 py-4 bg-white text-black placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </CollapsibleContent>
    </Collapsible>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible'
  import { Input } from '@/components/ui/input'
  
  interface Field {
    id: number;
    key: string;
    placeholder: string;
  }
  
  interface Props {
    modelValue: Record<string, string>;
    fields: Field[];
  }
  
  const props = defineProps<Props>()
  const emit = defineEmits(['update:modelValue'])
  
  const isOpen = ref(false)
  
  watch(() => props.modelValue['url-business-name'], (newValue) => {
    if (newValue && !isOpen.value) {
      isOpen.value = true
    }
  })
  
  const updateModelValue = (key: string, value: string) => {
    const updatedModelValue = { ...props.modelValue, [key]: value }
    emit('update:modelValue', updatedModelValue)
  }
  </script>
  
  <style scoped>
  /* Add any component-specific styles here */
  </style>