<script setup lang="ts">
import { useNuxtApp, provide, computed } from '#imports'

const nuxtApp = useNuxtApp()
const sharedData = computed(() => nuxtApp.$sharedComponents)

provide('sharedData', sharedData)
</script>

<template>
  <div v-if="!sharedData">Loading shared components...</div>
  <div v-else>
    <slot></slot>
  </div>
</template>