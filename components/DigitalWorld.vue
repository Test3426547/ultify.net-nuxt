<template>
  <section class="digital-world" :class="{ 'consultation-page': isConsultationPage }" v-if="digitalWorldData">
    <div class="container">
      <h2 class="title text-primary font-extrabold">{{ digitalWorldData.Title }}</h2>
      <div class="image-wrapper">
        <img :src="digitalWorldData.Image.url" :alt="digitalWorldData.Image.alternativeText || 'Sydney Opera House'" class="responsive-image">
      </div>
      <div class="info-wrapper">
        <p class="address">
          {{ digitalWorldData.Address.Address1 }}<br>
          {{ digitalWorldData.Address.Address2 }}<br>
          {{ digitalWorldData.Address.Address3 }}
        </p>
        <NuxtLink :to="getDirectionsLink.Link" class="get-directions">{{ getDirectionsLink.Text }}</NuxtLink>
      </div>
      <div class="button-wrapper">
        <NuxtLink v-for="link in actionLinks" :key="link.id" :to="link.Link" class="btn btn-primary btn-lg bounce-link">{{ link.Text }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed, watch, inject } from 'vue'
import { useRoute, useRouter } from '#app'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const error = computed(() => state.value.error)

const isConsultationPage = computed(() => route.path === '/consultation')

const getDirectionsLink = computed(() => digitalWorldData.value?.Address.Link.find(link => link.Text === "Get Directions") || {})
const actionLinks = computed(() => digitalWorldData.value?.Address.Link.filter(link => ["About Us", "Contact Us"].includes(link.Text)) || [])

// Initial data fetch
dataStore.fetchDigitalWorldData()

// Watch for route changes
watch(() => route.path, () => {
  dataStore.fetchDigitalWorldData()
})

const refreshDigitalWorldData = async (): Promise<void> => {
  await dataStore.fetchDigitalWorldData()
}

defineExpose({ refreshDigitalWorldData })

const navigateAndRefresh = async (path: string): Promise<void> => {
  await router.push(path)
  await refreshDigitalWorldData()
}

const sharedData = inject('sharedData')
const digitalWorldData = computed(() => sharedData.value.digitalWorld)
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