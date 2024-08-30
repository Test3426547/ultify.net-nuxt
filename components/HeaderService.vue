<template>
  <header class="header position-relative vh-100 overflow-hidden" v-if="headerData">
    <div class="header__background-top"></div>
    <div class="header__background-bottom"></div>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-7 d-flex flex-column py-5 position-relative">
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
            <div class="header__pills" v-if="headerData.Pill">
              <div class="row g-2 justify-content-start">
                <div class="col-md-4" v-for="pill in headerData.Pill" :key="pill.id">
                  <span class="badge w-100 rounded-pill pill-outline">
                    {{ pill.Title }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 d-flex justify-content-center align-items-center position-relative">
          <div>
            <ContactForm @submit="handleFormSubmit" />
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
import { ref, onMounted, watch } from 'vue';
import { useAsyncData } from '#app';
import ContactForm from '@/components/ContactForm.vue';

const props = defineProps({
  serviceId: {
    type: Number,
    default: 1,
  },
});

const { data: headerData, refresh: refreshHeaderData } = await useAsyncData(
  'headerData',
  () => $fetch(`/api/header-service-data?id=${props.serviceId}`)
);

watch(() => props.serviceId, async () => {
  await refreshHeaderData();
});

const handleFormSubmit = (formData) => {
  // Handle form submission logic here
  console.log('Form submitted:', formData);
};

onMounted(() => {
  console.log('Header Data:', headerData.value);
});
</script>