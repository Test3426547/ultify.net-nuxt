<template>
  <div v-if="pending" class="bg-gray-100 p-4 text-center">
    <p class="text-gray-600">Loading header data...</p>
  </div>
  <div v-else-if="headerData" class="relative h-screen w-full overflow-hidden">
    <!-- Background Image -->
    <img
      :src="headerData.attributes.Image.data.attributes.url"
      :alt="headerData.attributes.Image.data.attributes.alternativeText || 'Team working together'"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
        {{ headerData.attributes.Title }}
      </h1>
      <p class="text-xl sm:text-2xl text-white mb-8 max-w-2xl">
        {{ headerData.attributes.Subtitle }}
      </p>
      <NuxtLink
        :to="headerData.attributes.Link.Link"
        class="bg-emerald-500 text-white font-bold py-3 px-8 rounded-full hover:bg-emerald-600 transition duration-300"
      >
        {{ headerData.attributes.Link.Text }}
      </NuxtLink>
    </div>
  </div>
  <div v-else class="bg-gray-100 p-4 text-center">
    <p class="text-gray-600">Failed to load header data</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLazyFetch } from 'nuxt/app'

interface HeaderData {
  id: number
  attributes: {
    Title: string
    Subtitle: string
    Link: {
      Text: string
      Link: string
    }
    Image: {
      data: {
        attributes: {
          url: string
          alternativeText: string | null
        }
      }
    }
  }
}

const props = defineProps<{
  serviceId: number
}>()

const headerData = ref<HeaderData | null>(null)

const { data, error, pending } = await useLazyFetch<{ data: HeaderData }>(`/api/header-other-data`, {
  params: { id: props.serviceId },
  server: true, // Ensure data is fetched on the server for SSG
})

onMounted(() => {
  if (data.value) {
    headerData.value = data.value.data
  }
})

// Error handling
watch(error, (newError) => {
  if (newError) {
    console.error('Error fetching header data:', newError)
  }
})
</script>