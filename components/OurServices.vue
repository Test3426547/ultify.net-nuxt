<template>
  <section class="our-services">
    <div class="bg-primary text-white py-5 banner">
      <div class="container">
        <div class="row">
          <div class="col-md-8 mx-auto text-center">
            <h3 class="wave-heading">Our Services</h3>
            <p class="faq-subtitle">Explore our comprehensive range of expert services designed to meet your diverse needs.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container service-grid">
      <div class="row g-4">
        <ServiceCard
          v-for="(service, index) in services"
          :key="index"
          :title="service.title"
          :description="service.description"
          :imgSrc="service.imgSrc"
          :altText="service.altText"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServiceCard from './ServiceCard.vue'

const emit = defineEmits(['loaded'])

const services = ref([
  {
    title: "Website",
    description: "Our website services include custom design, development, and maintenance to help you establish a strong online presence.",
    imgSrc: "home-09.png",
    altText: "Website Service"
  },
  {
    title: "Social Media",
    description: "Engage and grow your audience with our comprehensive social media strategies and management services.",
    imgSrc: "home-10.png",
    altText: "Social Media Service"
  },
  {
    title: "Content Creation",
    description: "We provide high-quality content creation services including writing, video production, and graphic design.",
    imgSrc: "home-11.png",
    altText: "Content Creation Service"
  },
  {
    title: "Graphic Design & Animation",
    description: "Transform your ideas into stunning visuals with our creative graphic design and animation services.",
    imgSrc: "home-12.png",
    altText: "Graphic Design & Animation"
  },
  {
    title: "SEO",
    description: "Optimize your website to rank higher in search engines and attract more visitors with our SEO services.",
    imgSrc: "home-13.png",
    altText: "SEO Service"
  },
  {
    title: "SEM",
    description: "Leverage our SEM strategies to improve your online visibility and increase traffic.",
    imgSrc: "home-14.png",
    altText: "SEM Service"
  },
])

onMounted(() => {
  emit('loaded')
})
</script>

<style scoped>
.our-services {
  background-color: var(--bs-light);
}

.banner {
  padding-top: 110px !important; /* Increased top padding */
  padding-bottom: 110px !important; /* Increased bottom padding */
  margin-bottom: 100px; /* Add space below the banner */
}

.wave-heading {
  font-size: 3em;
  color: var(--bs-white);
}

.faq-subtitle {
  font-size: 1.2rem;
}

.service-grid {
  padding-top: 25px;
  padding-bottom: 100px; /* Increased bottom padding */
}

.row {
  --bs-gutter-x: 40px; /* Increase horizontal gap between cards */
}

@media (max-width: 991.98px) {
  .banner {
    padding-top: 50px !important;
    padding-bottom: 50px !important;
  }

  .service-grid {
    padding-top: 15px;
    padding-bottom: 50px;
  }
}
</style>