<template>
  <section class="digital-world" :class="{ 'consultation-page': isConsultationPage }">
    <div class="container">
      <h2 class="title text-primary">Impacting the digital world since 2019</h2>
      <div class="image-wrapper">
        <img src="/sydney.webp" alt="Sydney Opera House" class="responsive-image">
      </div>
      <div class="info-wrapper">
        <p class="address">
          Level 1/457,<br>
          59 Elizabeth Street,<br>
          Surry Hills NSW 2010
        </p>
        <NuxtLink to="/contact-us" class="get-directions">Get Directions</NuxtLink>
      </div>
      <div class="button-wrapper">
        <NuxtLink to="/about-us" class="btn btn-primary btn-lg bounce-link">ABOUT US</NuxtLink>
        <NuxtLink to="/contact-us" class="btn btn-primary btn-lg bounce-link">CONTACT US</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { onMounted, nextTick } from 'vue'

// In the setup function
onMounted(() => {
  nextTick(() => {
    emit('loaded')
  })
})

const route = useRoute();
const isConsultationPage = computed(() => route.path === '/consultation');
</script>

<style scoped>
.digital-world {
  background-color: var(--bs-light);
  padding: 90px 0 85px;
  text-align: center;
}

.digital-world.consultation-page {
  padding-top: 40px; /* Reduced top padding by 50px for consultation page */
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
    padding: 80px 0;
  }
  
  .digital-world.consultation-page {
    padding-top: 30px; /* Adjusted for mobile on consultation page */
  }
  
  .title {
    font-size: 2.5rem;
    margin-bottom: 40px;
  }
  
  .image-wrapper {
    margin-bottom: 30px;
    width: 90%;
  }
  
  .info-wrapper {
    margin-bottom: 30px;
  }
  
  .address {
    font-size: 0.9rem;
  }
  
  .get-directions {
    font-size: 0.72rem;
  }
  
  .button-wrapper {
    gap: 40px;
  }
  
  .btn {
    font-size: 1.2rem;
    padding: 15px 0;
    width: 200px;
  }
  
  .btn-lg {
    font-size: 1.5rem;
  }
}
</style>