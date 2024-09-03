<template>
    <div class="min-h-screen bg-ultify-blue py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <h1 class="text-4xl font-bold text-center text-white mb-12">Our Framework Technology</h1>
      <div class="flex flex-col lg:flex-row max-w-7xl mx-auto flex-grow">
        <!-- Left side - Framework options -->
        <div class="lg:w-1/2 pr-8">
          <h2 class="text-3xl font-semibold text-white mb-8">WE SPECIALIZE IN</h2>
          <ul>
            <li v-for="(framework, index) in frameworks" :key="index" 
                class="mb-6 text-2xl font-semibold text-white cursor-pointer transition-all duration-300 hover:translate-x-2"
                @mouseover="selectedFramework = framework"
                :class="{ 'text-ultify-blue': selectedFramework === framework }">
              {{ framework.name }} Framework
            </li>
          </ul>
        </div>
        
        <!-- Right side - Framework details -->
        <div class="lg:w-1/2 mt-8 lg:mt-0">
          <transition name="fade">
            <div v-if="selectedFramework" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col">
              <div class="w-full h-0 pb-[100%] relative overflow-hidden">
                <img :src="selectedFramework.image" :alt="selectedFramework.name" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-6 flex-grow">
                <h3 class="text-2xl font-bold text-white mb-4">{{ selectedFramework.title }}</h3>
                <p class="text-white mb-6">{{ selectedFramework.description }}</p>
                <ul class="space-y-2">
                  <li v-for="(point, index) in selectedFramework.points" :key="index" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const frameworks = [
    {
      name: 'Nuxt.js Framework',
      title: 'The Nuxt 3 Framework',
      image: '/nuxt.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Next.js Framework',
      title: 'The Next 14 Framework',
      image: '/next.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Vue.js Framework',
      title: 'The Vue Framework',
      image: '/vue.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'React Framework',
      title: 'The React Framework',
      image: '/react.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Django Framework',
      title: 'The Django Framework',
      image: '/django.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Laravel Framework',
      title: 'The Laravel Framework',
      image: '/angular.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    }
  ]
  
  const selectedFramework = ref(null)
  </script>
  
  <style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>