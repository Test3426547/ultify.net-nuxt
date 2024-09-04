<template>
  <section class="digital-world" :class="{ 'consultation-page': isConsultationPage }" v-if="digitalWorldData || title">
    <div class="container">
      <h2 class="title text-primary font-extrabold">{{ digitalWorldData?.Title || title }}</h2>
      <div class="image-wrapper" v-if="digitalWorldData?.Image || imageUrl">
        <img :src="digitalWorldData?.Image.url || imageUrl" :alt="digitalWorldData?.Image.alternativeText || imageAlt" class="responsive-image">
      </div>
      <div class="info-wrapper" v-if="digitalWorldData?.Address || address">
        <p class="address">
          {{ digitalWorldData?.Address.Address1 || address.line1 }}<br>
          {{ digitalWorldData?.Address.Address2 || address.line2 }}<br>
          {{ digitalWorldData?.Address.Address3 || address.line3 }}
        </p>
        <NuxtLink :to="mergedGetDirectionsLink.Link" class="get-directions">{{ mergedGetDirectionsLink.Text }}</NuxtLink>
      </div>
      <div class="button-wrapper">
        <NuxtLink v-for="link in mergedActionLinks" :key="link.id" :to="link.Link" class="btn btn-primary btn-lg bounce-link">{{ link.Text }}</NuxtLink>
      </div>
    </div>
  </section>
  <div v-else-if="error" class="error-message">
    {{ loadingErrorText }}: {{ error }}
  </div>
  <div v-else-if="isLoading" class="loading-message">
    {{ loadingText }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from '#app'

interface Address {
  line1: string;
  line2: string;
  line3: string;
}

interface Link {
  id: string;
  Text: string;
  Link: string;
}

interface DigitalWorldProps {
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
  address?: Address;
  getDirectionsLink?: Link;
  actionLinks?: Link[];
  loadingText?: string;
  loadingErrorText?: string;
}

const props = withDefaults(defineProps<DigitalWorldProps>(), {
  title: 'Our Digital World',
  imageUrl: '',
  imageAlt: 'Digital World Image',
  address: () => ({
    line1: '',
    line2: '',
    line3: ''
  }),
  getDirectionsLink: () => ({
    id: 'default-directions',
    Text: 'Get Directions',
    Link: '#'
  }),
  actionLinks: () => [],
  loadingText: 'Loading Digital World data...',
  loadingErrorText: 'Error loading Digital World data'
})

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const digitalWorldData = computed(() => state.value.digitalWorldData)
const error = computed(() => state.value.error)
const isLoading = computed(() => state.value.loading.digitalWorld)

const isConsultationPage = computed(() => route.path === '/consultation')

const mergedGetDirectionsLink = computed(() => {
  const apiLink = digitalWorldData.value?.Address.Link.find(link => link.Text === "Get Directions")
  return apiLink || props.getDirectionsLink
})

const mergedActionLinks = computed(() => {
  if (digitalWorldData.value?.Address.Link) {
    return digitalWorldData.value.Address.Link.filter(link => ["About Us", "Contact Us"].includes(link.Text))
  }
  return props.actionLinks
})

const fetchDigitalWorldData = async () => {
  if (!state.value.digitalWorldData) {
    await dataStore.fetchDigitalWorldData()
  }
}

onMounted(() => {
  fetchDigitalWorldData()
})

// Watch for route changes
watch(() => route.path, () => {
  fetchDigitalWorldData()
})

const refreshDigitalWorldData = async (): Promise<void> => {
  await dataStore.fetchDigitalWorldData()
}

defineExpose({ refreshDigitalWorldData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshDigitalWorldData()
}
</script>

<style scoped>
.digital-world {
  background-color: var(--bs-light);
  padding: 90px 0 85px;
  text-align: center;
}

.digital-world.consultation-page {
  padding-top: 40px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 80px;
  color: var(--bs-primary);
}

.image-wrapper {
  position: relative;
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}

.responsive-image {
  width: 100%;
  height: auto;
  display: block;
}

.info-wrapper {
  margin-bottom: 40px;
}

.address {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--bs-black);
  margin-bottom: 10px;
}

.get-directions {
  display: inline-block;
  color: var(--bs-black);
  text-decoration: underline;
  font-size: 0.8rem;
  margin-top: 10px;
}

.button-wrapper {
  display: flex;
  justify-content: center;
  gap: 100px;
}

.btn {
  font-size: 1.5rem;
  padding: 20px 0;
  border-radius: 50px;
  text-decoration: none;
  transition: transform 0.3s ease-in-out;
  width: 250px;
  display: inline-block;
  text-align: center;
}

.btn-lg {
  font-size: 1.8rem;
}

.btn-primary {
  background-color: var(--bs-primary);
  color: var(--bs-white);
}

.bounce-link:hover {
  transform: translateY(-5px);
  animation: bounce 1s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .digital-world {
    padding: 60px 0;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  .image-wrapper {
    width: 100%;
  }

  .button-wrapper {
    flex-direction: column;
    gap: 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>