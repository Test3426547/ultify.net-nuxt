<template>
  <section class="bg-emerald-500 py-24" v-if="ctaData">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="flex justify-between items-center flex-col md:flex-row space-y-10 md:space-y-0">
        <h2 class="text-5xl font-bold text-white md:max-w-[60%] text-center md:text-left leading-tight">
          {{ ctaData.Title }}
        </h2>
        <Button
          :to="ctaData.Link"
          variant="secondary"
          size="lg"
          class="bg-white text-black text-2xl font-bold px-10 py-6 rounded-full transition-all duration-300 ease-in-out hover:bg-black hover:text-white"
        >
          {{ ctaData.Text }}
        </Button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from '#app'
import { Button } from '@/components/ui/button'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const ctaData = computed(() => state.value.ctaData)
const error = computed(() => state.value.error)

// Initial data fetch
dataStore.fetchCTAData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchCTAData()
})

const refreshCtaData = async (): Promise<void> => {
  await dataStore.fetchCTAData()
}

defineExpose({ refreshCtaData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshCtaData()
}
</script>