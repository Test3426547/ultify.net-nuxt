<template>
  <div class="min-h-screen bg-ultify-blue py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
    <div class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
      <!-- Left side - Framework options -->
      <div class="lg:w-1/2 lg:pr-8 relative" style="top: -80px;">
        <h1 class="text-4xl font-bold text-white mb-16 text-left" style="margin-top: 100px;">Our Framework Technology</h1>
        <h2 class="text-3xl font-semibold text-white mb-8" style="margin-top: 70px;">WE SPECIALIZE IN</h2>
        <ul class="space-y-4">
          <li v-for="(framework, index) in frameworks" :key="index" 
              class="inline-block mr-4 mb-4"
              @mouseover="selectedFramework = framework"
              @mouseleave="selectedFramework = null">
            <span class="px-6 py-2 text-xl font-bold text-white border-2 border-white rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:text-ultify-blue">
              {{ framework.name }}
            </span>
          </li>
        </ul>
        <div class="mt-12 flex items-center text-white cursor-pointer group">
          <ArrowLeftIcon class="w-6 h-6 mr-2 group-hover:animate-bounce-horizontal" />
          <span class="text-lg font-semibold">Read More About Our Frameworks</span>
        </div>
      </div>
      
      <!-- Right side - Framework details -->
      <div class="lg:w-1/2 mt-8 lg:mt-0 relative" style="top: -50px;">
        <transition name="fade">
          <div v-if="selectedFramework" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img :src="selectedFramework.image" :alt="selectedFramework.name" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">{{ selectedFramework.title }}</h3>
              <p class="text-white mb-6">{{ selectedFramework.description }}</p>
              <div class="flex">
                <ul class="space-y-2 w-1/2 pr-2">
                  <li v-for="(point, index) in selectedFramework.points.slice(0, 3)" :key="index" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point }}</span>
                  </li>
                </ul>
                <ul class="space-y-2 w-1/2 pl-2">
                  <li v-for="(point, index) in selectedFramework.points.slice(3, 6)" :key="index + 3" class="flex items-center">
                    <span class="w-4 h-px bg-white mr-2"></span>
                    <span class="text-white">{{ point }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div v-else class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col" style="margin-top: 100px;">
            <div class="w-full h-0 pb-[60%] relative overflow-hidden">
              <img src="/website-02m.png" alt="Default Framework Image" class="absolute inset-0 w-full h-full object-contain">
            </div>
            <div class="p-6 flex-grow">
              <h3 class="text-2xl font-bold text-white mb-4">Our Framework Technology</h3>
              <p class="text-white mb-6">
                Our technology stack includes a range of popular frameworks to ensure robust and scalable solutions. 
                We have the expertise to work beyond these listed technologies, offering tailored solutions for your needs.
              </p>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ArrowLeftIcon } from '@heroicons/vue/24/solid'

const frameworks = [
  {
    name: 'Nuxt.js',
    title: 'The Nuxt 3 Framework',
    image: '/nuxt.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
  },
  {
    name: 'Next.js',
    title: 'The Next 14 Framework',
    image: '/next.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
  },
  {
    name: 'Vue.js',
    title: 'The Vue Framework',
    image: '/vue.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
  },
  {
    name: 'React',
    title: 'The React Framework',
    image: '/react.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
  },
  {
    name: 'Django',
    title: 'The Django Framework',
    image: '/django.svg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
  },
  {
    name: 'Laravel',
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

@keyframes bounce-horizontal {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(-10px); }
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 1s infinite;
}
</style>