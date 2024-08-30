<template>
  <div class="lead-section position-relative">
    <div class="container position-relative text-center">
      <div class="content-wrapper">
        <h1 class="fw-bold mb-5">
          Gain a <span class="text-highlight">Lead,</span> Without The <span class="text-highlight">Sweat</span>
        </h1>
        <p class="lead">
          We understand that the digital marketing aspect of things is rather complicated, especially while running a business. Our SEO, SEM, and PPC strategies have been proven to work and are constantly aligned with current algorithms. We are so confident, that if we don’t deliver, we’ll refund you. Whether you need leads, a website, content, or a professional to help, we are ready and remove the hard work from your path.
        </p>
      </div>
      <img :src="leadImage" alt="Lead Image" class="lead-image">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const leadImage = ref('/home-02.png')
</script>

<style scoped>
.lead-section {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
  background-color: var(--bs-primary);
}

.container {
  position: relative;
  height: 100%;
  width: 100%;
}

.content-wrapper {
  position: relative;
  z-index: 2;
  padding: 0 20px;
  margin: auto;
  max-width: 800px;
}

.lead-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  clip-path: ellipse(70% 50% at 50% 50%);
}

.text-highlight {
  color: var(--bs-secondary) !important;
}

.lead {
  color: var(--bs-black) !important;
}
</style>