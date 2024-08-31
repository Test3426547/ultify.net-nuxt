<script setup>
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
</script>

<template>
  <NuxtLayout>
    <Navbar />
    <NuxtPage />
    <Footer />
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
