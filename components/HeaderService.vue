<template>
  <header class="header position-relative vh-100 overflow-hidden">
    <div class="header__background-top"></div>
    <div class="header__background-bottom"></div>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-7 d-flex flex-column py-5 position-relative">
          <div v-if="pending">Loading...</div>
          <template v-else-if="headerData">
            <div class="header__top content-shift">
              <h1 class="header__title fw-bold text-primary">
                {{ headerData.Title }}
              </h1>
              <p class="header__subtitle text-primary">
                {{ headerData.Subtitle }}
              </p>
            </div>
            <div class="header__bottom content-shift">
              <h2 class="header__subtitle-large fw-bold text-white">
                {{ headerData.Heading }}
              </h2>
              <p class="header__subtitle text-white mb-4">
                {{ headerData.Subheading }}
              </p>
              <div class="header__pills">
                <div class="row g-2 justify-content-start">
                  <div class="col-md-4" v-for="pill in headerData.Pill" :key="pill.id">
                    <span class="badge w-100 rounded-pill pill-outline">
                      {{ pill.Title }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
        <div class="col-lg-5 d-flex justify-content-center align-items-center position-relative">
          <div>
            <ContactForm @submit="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
    <svg class="header__scroll-arrow" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 35L36.5 18.5L33.25 15.25L23.5 25V0H16.5V25L6.75 15.25L3.5 18.5L20 35Z" fill="white"/>
    </svg>
  </header>
</template>

<script setup lang="ts">
import { useAsyncData, useFetch, useNuxtApp } from '#app'
import { watch, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ContactForm from '@/components/ContactForm.vue'

// const { $cachedFetch } = useNuxtApp()

const route = useRoute()
const props = defineProps<{
  serviceId: number
}>()

interface HeaderData {
  Title: string
  Subtitle: string
  Heading: string
  Subheading: string
  Pill: Array<{ id: number; Title: string }>
}

const headerData = ref<HeaderData | null>(null)
const pending = ref<boolean>(true)

const fetchHeaderServiceData = async (): Promise<void> => {
  pending.value = true
  try {
    const { data } = await useFetch<HeaderData>(`/api/header-service-data?id=${props.serviceId}`)
    headerData.value = data.value
  } catch (error) {
    console.error('Error fetching header service data:', error)
  } finally {
    pending.value = false
  }
}

// Watch for serviceId changes
watch(() => props.serviceId, async (newId: number, oldId: number) => {
  if (newId !== oldId) {
    await fetchHeaderServiceData()
  }
})

// Watch for route changes
watch(() => route.path, async () => {
  await fetchHeaderServiceData()
})

onMounted(fetchHeaderServiceData)

// Add this function to refresh the data
const refreshHeaderData = async (): Promise<void> => {
  await fetchHeaderServiceData()
}

// Expose the refresh function to the parent component
defineExpose({ refreshHeaderData })

console.log('Header Service Data:', headerData.value)

interface FormData {
  // Define the structure of your form data here
  [key: string]: any
}

const handleSubmit = (formData: FormData): void => {
  // Implement form submission logic here
  console.log('Form submitted:', formData)
}

// const { data: componentData } = await useAsyncData<unknown>('componentData', () => $cachedFetch('/api/component-data'))

</script>
  
  <style scoped>
  .header {
    position: relative;
  }
  
  .header__background-top {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background-color: var(--bs-white);
  }
  
  .header__background-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50%;
    background-color: var(--bs-primary);
  }
  
  .header__top {
    position: absolute;
    top: calc(50% - 260px);
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .header__bottom {
    position: absolute;
    top: calc(50% + 60px);
    left: 0;
    right: 0;
    z-index: 1;
  }
  
  .content-shift {
    padding-left: 150px;
  }
  
  .header__title {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .header__subtitle {
    font-size: 1.1rem;
  }
  
  .header__subtitle-large {
    font-size: 3rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }
  
  .header__pills {
    display: flex;
    flex-direction: column;
  }
  
  .header__pills .row {
    max-width: 700px;
  }
  
  .header__pills .badge {
    font-size: 0.9rem;
    padding: 0.5em 1em;
    white-space: nowrap;
    display: inline-block;
    text-align: center;
  }
  
  .pill-outline {
    background-color: transparent !important;
    color: var(--bs-white) !important;
    border: 1px solid var(--bs-white);
  }
  
  .consultation-form {
    position: relative;
    z-index: 1;
    width: calc(100% + 150px);
    max-width: 550px;
    background-color: var(--bs-light);
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    height: calc(100% + 50px);
    max-height: 650px;
    margin-top: 50px;
    margin-bottom: -50px;
  }
  
  .ms-n50 {
    margin-left: -50px;
  }
  
  .consultation-form-inner {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  
  .form-container {
    padding: 0 25px;
  }
  
  .spacer {
    height: 50px;
  }
  
  form {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    flex-grow: 1;
    display: flex;
    align-items: center;
  }
  
  .form-control {
    border-radius: 50px;
    padding: 0.75rem 1.5rem;
    border: none;
    background-color: var(--bs-white);
    width: 100%;
  }
  
  .btn-block {
    display: block;
    width: 100%;
    border-radius: 50px;
    padding: 0.85rem 1.5rem;
    margin-top: auto;
    font-size: 1rem;
  }
  
  .disclaimer {
    margin-top: 1rem;
    font-size: 0.8rem;
  }
  
  .header__scroll-arrow {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    animation: bounce 3s infinite;
    z-index: 1;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(-20px);
    }
    60% {
      transform: translateX(-50%) translateY(-10px);
    }
  }
  
  @media (max-width: 1200px) {
    .content-shift {
      padding-left: 100px;
    }
  }
  
  @media (max-width: 992px) {
    .content-shift {
      padding-left: 50px;
    }
  
    .header__top {
      top: calc(50% - 220px);
    }
  
    .header__bottom {
      top: calc(50% + 40px);
    }
  
    .header__title {
      font-size: 2.5rem;
    }
  
    .header__subtitle-large {
      font-size: 2.5rem;
    }
  
    .header__subtitle {
      font-size: 1rem;
    }
  
    .consultation-form {
      width: 100%;
      max-width: 500px;
    }
  }
  
  @media (max-width: 768px) {
    .content-shift {
      padding-left: 20px;
    }
  
    .header__top {
      top: calc(50% - 180px);
    }
  
    .header__bottom {
      top: calc(50% + 20px);
    }
  
    .header__title {
      font-size: 2rem;
    }
  
    .header__subtitle-large {
      font-size: 2rem;
    }
  
    .header__subtitle {
      font-size: 0.9rem;
    }
  
    .header__pills .badge {
      font-size: 0.8rem;
      padding: 0.4rem 1rem;
    }
  
    .consultation-form {
      width: 100%;
      max-width: 400px;
    }
  }
  </style>