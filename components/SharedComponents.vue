<script setup lang="ts">
import { useNuxtApp } from '#app'

const nuxtApp = useNuxtApp()
const sharedData = nuxtApp.$sharedComponents

provide('sharedData', sharedData)
</script>

<template>
  <div v-if="!sharedData">Loading shared components...</div>
  <div v-else>
    <slot></slot>
  </div>
</template>