<template>
  <section class="bg-ultify-grey">
    <div class="bg-ultify-blue py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl md:text-5xl font-bold text-white text-center mb-4">Our Services</h2>
        <p class="text-xl text-white text-center max-w-3xl mx-auto">
          Explore our comprehensive range of expert services designed to meet your diverse needs.
        </p>
      </div>
    </div>
    <div class="container mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink
          v-for="service in services"
          :key="service.title"
          :to="service.link"
          class="bg-ultify-blue rounded-lg p-6 text-white transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
        >
          <h3 class="text-2xl font-bold mb-4">{{ service.title }}</h3>
          <p class="mb-4">{{ service.description }}</p>
          <div class="flex justify-end">
            <component :is="service.icon" class="w-12 h-12" />
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Globe, Users, PenTool, Palette, Search, TrendingUp } from 'lucide-vue-next'

const services = [
  {
    title: 'Website',
    description: 'Our website services include custom design, development, and maintenance to help you establish a strong online presence.',
    link: '/website',
    icon: Globe
  },
  {
    title: 'Social Media',
    description: 'Engage and grow your audience with our comprehensive social media strategies and management services.',
    link: '/social-media',
    icon: Users
  },
  {
    title: 'Content Creation',
    description: 'We provide high-quality content creation services including writing, video production, and graphic design.',
    link: '/content-creation',
    icon: PenTool
  },
  {
    title: 'Graphic Design & Animation',
    description: 'Transform your ideas into stunning visuals with our creative graphic design and animation services.',
    link: '/graphic-design',
    icon: Palette
  },
  {
    title: 'SEO',
    description: 'Optimize your website to rank higher in search engines and attract more visitors with our SEO services.',
    link: '/seo',
    icon: Search
  },
  {
    title: 'SEM',
    description: 'Leverage our SEM strategies to improve your online visibility and increase traffic.',
    link: '/sem',
    icon: TrendingUp
  }
]
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>