<script setup>
import Navbar from '~/components/layouts/Navbar.vue'
import Footer from '~/components/layouts/Footer.vue'
import SuspenseWrapper from './components/SuspenseWrapper.vue';
</script>

<template>
  <NuxtLayout>
    <SuspenseWrapper defaultFallback="Loading navbar...">
      <Navbar />
    </SuspenseWrapper>
    <NuxtPage />
    <SuspenseWrapper defaultFallback="Loading footer...">
      <Footer />
    </SuspenseWrapper>
  </NuxtLayout>
</template>

<style scoped>

/* Navbar Styles */
.navbar {
  background-color: var(--bs-navbar-bg) !important;
  box-shadow: var(--bs-navbar-shadow);
  border: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}

</style>
