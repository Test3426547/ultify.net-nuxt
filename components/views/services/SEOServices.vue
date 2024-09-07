<template>
  <section class="min-h-screen bg-ultify-grey text-black py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
    <div class="max-w-7xl mx-auto w-full">
      <h2 class="text-4xl md:text-5xl font-bold text-center mb-4">SEO Services</h2>
      <p class="text-xl text-center mb-8 max-w-3xl mx-auto">
        Explore our comprehensive range of expert services designed to meet your diverse needs.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[50px]">
        <Card v-for="(service, index) in services" :key="index" 
              class="overflow-hidden transform transition duration-500 hover:scale-105 animate-fadeInUp rounded-3xl"
              :style="{ animationDelay: `${index * 200}ms` }">
          <div class="flex flex-col sm:flex-row h-full">
            <CardContent class="sm:w-1/2 bg-emerald-500 flex items-center justify-center p-6">
              <img :src="service.imgSrc" :alt="service.altText" class="w-24 h-24 object-contain filter drop-shadow-lg">
            </CardContent>
            <CardContent class="sm:w-1/2 flex flex-col justify-center items-center text-center p-6">
              <CardTitle class="mb-2">{{ service.title }}</CardTitle>
              <CardDescription>{{ service.description }}</CardDescription>
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Card, CardTitle, CardDescription, CardContent } from '@/components/ui/card.vue'

const services = [
  {
    title: "Technical SEO",
    description: "Optimizing the infrastructure and backend of a website to make it easier for search engines to crawl.",
    imgSrc: "/seo-04.png",
    altText: "Technical SEO Service"
  },
  {
    title: "On-Page SEO",
    description: "On-page SEO involves optimizing both the content and HTML source code of a page.",
    imgSrc: "/seo-05.png",
    altText: "On-Page SEO Service"
  },
  {
    title: "Off-Page SEO",
    description: "Techniques and strategies used to improve a website's search engine rankings through actions that occur outside the boundaries of the website itself.",
    imgSrc: "/seo-06.png",
    altText: "Off-Page SEO Service"
  },
  {
    title: "Keywords",
    description: "Keywords are the foundation of your content strategy, helping search engines understand what your content is about and match it with relevant user queries.",
    imgSrc: "/seo-07.png",
    altText: "Keywords Service"
  },
];
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>