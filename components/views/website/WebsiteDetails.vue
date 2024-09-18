<template>
  <div class="bg-ultify-grey min-h-screen">
    <div
      v-for="(section, index) in websiteDetails"
      :key="section.id"
      :ref="el => { if (el) sectionRefs[index] = el }"
      class="min-h-screen flex items-center justify-center p-8 transition-all duration-1000 ease-in-out opacity-0 scale-95"
    >
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div :class="[
          'md:w-1/2',
          { 'md:order-last': index % 2 === 0 }
        ]">
          <h2 class="text-4xl font-bold text-emerald-500 mb-4">{{ section.attributes.Heading }}</h2>
          <p class="text-ultify-dark-grey">{{ section.attributes.Description }}</p>
        </div>
        <div :class="[
          'md:w-1/2',
          { 'md:order-first': index % 2 === 0 }
        ]">
          <img
            :src="section.attributes.Image.data.attributes.url"
            :alt="section.attributes.Heading"
            class="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useDataStore } from '@/stores'

const dataStore = useDataStore()

const websiteDetails = computed(() => {
  return dataStore.state.websiteDetailsData?.data[0]?.attributes?.WebsiteDetails || []
})

const sectionRefs = ref([])

onMounted(() => {
  if (!dataStore.state.websiteDetailsData) {
    dataStore.fetchWebsiteDetailsData()
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'scale-100')
          entry.target.classList.remove('opacity-0', 'scale-95')
        } else {
          entry.target.classList.remove('opacity-100', 'scale-100')
          entry.target.classList.add('opacity-0', 'scale-95')
        }
      })
    },
    {
      threshold: 0.5,
    }
  )

  sectionRefs.value.forEach((ref) => {
    if (ref) observer.observe(ref)
  })

  onUnmounted(() => {
    sectionRefs.value.forEach((ref) => {
      if (ref) observer.unobserve(ref)
    })
  })
})
</script>