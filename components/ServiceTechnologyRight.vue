<template>
    <div class="min-h-screen bg-ultify-dark-grey py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        <!-- Left side - CMS details -->
        <div class="lg:w-1/2 mt-8 lg:mt-0 relative" style="top: -50px;">
          <transition name="fade">
            <div v-if="selectedCMS" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
              <div class="w-full h-0 pb-[60%] relative overflow-hidden">
                <img :src="selectedCMS.image" :alt="selectedCMS.name" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-6 flex-grow">
                <h3 class="text-2xl font-bold text-white mb-4">{{ selectedCMS.title }}</h3>
                <p class="text-white mb-6">{{ selectedCMS.description }}</p>
                <div class="flex">
                  <ul class="space-y-2 w-1/2 pr-2">
                    <li v-for="(point, index) in selectedCMS.points.slice(0, 3)" :key="index" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white">{{ point }}</span>
                    </li>
                  </ul>
                  <ul class="space-y-2 w-1/2 pl-2">
                    <li v-for="(point, index) in selectedCMS.points.slice(3, 6)" :key="index + 3" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white">{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
  
        <!-- Right side - CMS options -->
        <div class="lg:w-1/2 lg:pl-8 relative" style="top: -80px;">
          <h1 class="text-4xl font-bold text-white mb-16 text-right" style="margin-top: 100px;">Our CMS Technology</h1>
          <h2 class="text-3xl font-semibold text-white mb-8 text-right" style="margin-top: 70px;">WE SPECIALIZE IN</h2>
          <ul class="text-right">
            <li v-for="(cms, index) in cmsTechnologies" :key="index" 
                class="mb-6 text-2xl font-semibold text-white cursor-pointer transition-all duration-300 hover:-translate-x-2"
                @mouseover="selectedCMS = cms"
                :class="{ 'text-ultify-blue': selectedCMS === cms }">
              {{ cms.name }} Development
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const cmsTechnologies = [
    {
      name: 'Shopify',
      title: 'Shopify Development',
      image: '/shopify.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'WordPress',
      title: 'WordPress Development',
      image: '/wordpress.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'GoDaddy',
      title: 'GoDaddy Development',
      image: '/godaddy.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Wix',
      title: 'Wix Development',
      image: '/wix.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Weebly',
      title: 'Weebly Development',
      image: '/weebly.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Squarespace',
      title: 'Squarespace Development',
      image: '/squarespace.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    }
  ]
  
  const selectedCMS = ref(null)
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>