<template>
  <section class="min-h-screen bg-ultify-grey flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl w-full">
      <h2 ref="mainHeading" class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-500 text-center mb-8 sm:mb-12 lg:mb-16 opacity-0 -mt-[50px] sm:-mt-[75px] lg:-mt-[100px]">
        {{ consultationHeroData?.title }}
      </h2>
      <div v-if="state.loading.consultationHero" class="text-center">
        <p class="text-base sm:text-lg text-white">Loading...</p>
      </div>
      <div v-else-if="state.error" class="text-center">
        <p class="text-base sm:text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
      </div>
      <div v-else-if="consultationHeroData" class="flex flex-col lg:flex-row items-stretch justify-between space-y-8 sm:space-y-12 lg:space-y-0 lg:space-x-12">
        <div ref="imageContainer" class="w-full lg:w-1/2 opacity-0">
          <img :src="consultationHeroData.image.url" :alt="consultationHeroData.image.alternativeText || 'Consultation Hero Image'" class="w-full h-full object-cover rounded-3xl shadow-lg" />
        </div>
        <div ref="infoContainer" class="w-full lg:w-1/2 opacity-0">
          <Card class="h-full rounded-3xl overflow-hidden">
            <CardContent class="p-6 sm:p-8 space-y-6 sm:space-y-8 pt-[30px] sm:pt-[38px]">
              <div v-for="guarantee in consultationHeroData.guarantees" :key="guarantee.id" class="space-y-2">
                <h3 class="text-xl sm:text-2xl font-semibold text-emerald-500">{{ guarantee.heading }}</h3>
                <p class="text-emerald-500 text-base sm:text-lg">{{ guarantee.body }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div v-else class="text-center">
        <p class="text-base sm:text-lg text-white">No data available.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '../../../stores'
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card.vue'
import { useRoute, useRouter } from 'nuxt/app'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const mainHeading = ref(null);
const imageContainer = ref(null);
const infoContainer = ref(null);

interface ConsultationHeroData {
  title: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  guarantees: Array<{
    id: number;
    heading: string;
    body: string;
  }>;
}

const consultationHeroData = computed<ConsultationHeroData | null>(() => state.value.consultationHeroData)

// Initial data fetch
dataStore.fetchConsultationHeroData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchConsultationHeroData()
})

const refreshConsultationHeroData = async (): Promise<void> => {
  await dataStore.fetchConsultationHeroData()
}

defineExpose({ refreshConsultationHeroData })

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(mainHeading.value, { opacity: 1, y: 50, duration: 1 })
    .to(imageContainer.value, { opacity: 1, x: 0, duration: 1 }, '-=0.5')
    .to(infoContainer.value, { opacity: 1, x: 0, duration: 1 }, '-=0.5');
});
</script>

<style scoped>
@media (max-width: 1023px) {
  .lg\:space-x-12 {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>