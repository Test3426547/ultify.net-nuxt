<template>
  <section class="bg-ultify-grey py-48">
    <div class="container mx-auto px-5 max-w-7xl">
      <div v-for="(service, index) in services" :key="index" class="flex flex-col lg:flex-row items-center justify-between mb-48 last:mb-0">
        <div :class="[
          'lg:w-[calc(50%-50px)] mb-8 lg:mb-0',
          index % 2 === 0 ? 'lg:-translate-x-16' : 'lg:translate-x-16 lg:order-2'
        ]">
          <h2 class="text-2xl lg:text-3xl font-bold text-emerald-500 mb-5">{{ service.title }}</h2>
          <p class="text-[#34495e] text-base lg:text-lg leading-relaxed">{{ service.description }}</p>
        </div>
        <div :class="[
          'lg:w-[calc(50%-50px)]',
          index % 2 === 0 ? 'lg:translate-x-16' : 'lg:-translate-x-16 lg:order-1'
        ]">
          <img :src="service.image" :alt="service.title" class="w-full h-auto rounded-lg">
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const services = ref([
  {
    title: 'Website Maintenance',
    description: 'We offer comprehensive website maintenance services to ensure your site\'s security, reliability, and performance. Our team conducts regular checks and updates to keep your site running smoothly.',
    image: '/website-08.png'
  },
  {
    title: 'Website Management',
    description: 'ULTIFY provides comprehensive website management services to ensure your site is always up-to-date, secure, and performing at its best. Our services include regular updates, user experience improvements, and multimedia content management.',
    image: '/website-06.png'
  },
  {
    title: 'Website Design & Development',
    description: 'Need a custom designed, visually pleasing, highly optimized, and converting website? Let our team at ULTIFY handle all your website design and development needs. Our certified programmers and designers produce high-quality projects to help your business grow and outperform competitors in every aspect.',
    image: '/website-04.png'
  },
  {
    title: 'Mobile Conversion',
    description: 'Did you know that 86% of the world owns a smartphone, compared to only 25% owning a computer? This statistic emphasizes the importance of having a website optimized for all devices. At ULTIFY, we provide a highly optimized website for all devices, ensuring no loss in quality, conversion rates, or user experience.',
    image: '/website-05.png'
  },
  {
    title: 'Conversion Rate Optimization',
    description: 'What is the point of a website if it doesn\'t convert? At ULTIFY, we implement CRO strategies to maximize your site\'s effectiveness, driving more conversions and sales through meticulous analysis and A/B testing.',
    image: '/website-07.png'
  },
  {
    title: 'Website Audit & Strategy',
    description: 'Our audit and strategy services go beyond finding and fixing issues. We provide strategic guidance to unlock new opportunities and help your website reach its full potential.',
    image: '/website-09.png'
  }
])
</script>