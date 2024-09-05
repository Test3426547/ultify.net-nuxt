<template>
    <ScrollArea class="h-72 w-48 rounded-md border">
      <div class="p-4">
        <h4 class="mb-4 text-sm font-medium leading-none">Tags</h4>
        <template v-for="tag in tags" :key="tag">
          <div class="text-sm">
            {{ tag }}
          </div>
          <hr class="my-2 border-t border-gray-200" />
        </template>
      </div>
    </ScrollArea>
  </template>
  
  <script setup lang="ts">
  import { ScrollArea } from '@/components/ui/scroll-area'
  
  const tags = Array.from({ length: 50 }, (_, i, a) => `v1.2.0-beta.${a.length - i}`)
  </script>