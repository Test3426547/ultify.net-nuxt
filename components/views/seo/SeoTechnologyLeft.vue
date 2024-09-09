<template>
    <div class="min-h-screen bg-emerald-500 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        <!-- Left side - Framework options -->
        <div class="lg:w-1/2 lg:pr-8 relative lg:top-[-80px]">
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-16 text-left mt-8 sm:mt-16 lg:mt-[100px]">Our Framework Technology</h1>
          <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-8 mt-8 sm:mt-16 lg:mt-[70px]">WE SPECIALIZE IN</h2>
          <ul class="space-y-4 sm:space-y-8">
            <li v-for="(framework, index) in frameworks" :key="index" 
                class="block">
              <span 
                class="px-4 sm:px-6 py-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white border-2 border-white rounded-full cursor-pointer transition-all duration-300 inline-block hover:animate-bounce-vertical"
                @mouseover="debouncedSelectFramework(framework)"
                @mouseleave="debouncedSelectFramework(null)"
                @click="handleFrameworkClick(framework)"
              >
                {{ framework.name }} SEO
              </span>
            </li>
          </ul>
        </div>
        
        <!-- Right side - Framework details -->
        <div class="lg:w-1/2 mt-8 lg:mt-0 relative lg:top-[-50px]">
          <transition name="fade">
            <div v-if="selectedFramework" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col mt-8 sm:mt-16 lg:mt-[100px]">
              <div class="w-full h-0 pb-[60%] relative overflow-hidden">
                <img :src="selectedFramework.image" :alt="selectedFramework.name" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-4 sm:p-6 flex-grow">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">{{ selectedFramework.title }}</h3>
                <p class="text-white mb-6">{{ selectedFramework.description }}</p>
                <div class="flex flex-col sm:flex-row">
                  <ul class="space-y-2 sm:w-1/2 sm:pr-2 mb-4 sm:mb-0">
                    <li v-for="(point, index) in selectedFramework.points.slice(0, 3)" :key="index" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white text-sm sm:text-base">{{ point }}</span>
                    </li>
                  </ul>
                  <ul class="space-y-2 sm:w-1/2 sm:pl-2">
                    <li v-for="(point, index) in selectedFramework.points.slice(3, 6)" :key="index + 3" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white text-sm sm:text-base">{{ point }}</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-6 flex items-center text-white cursor-pointer group">
                  <ArrowLeftIcon class="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:animate-bounce-horizontal" />
                  <span class="text-base sm:text-lg font-semibold">Read More About Our Frameworks</span>
                </div>
              </div>
            </div>
            <div v-else class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col mt-8 sm:mt-16 lg:mt-[100px]">
              <div class="w-full h-0 pb-[60%] relative overflow-hidden">
                <img src="/website-02m.png" alt="Default Framework Image" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-4 sm:p-6 flex-grow">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Our Framework Technology</h3>
                <p class="text-white mb-6">
                  Our technology stack includes a range of popular frameworks to ensure robust and scalable solutions. 
                  We have the expertise to work beyond these listed technologies, offering tailored solutions for your needs.
                </p>
                <div class="mt-6 flex items-center text-white cursor-pointer group">
                  <ArrowLeftIcon class="w-5 h-5 sm:w-6 sm:h-6 mr-2 group-hover:animate-bounce-horizontal" />
                  <span class="text-base sm:text-lg font-semibold">Read More About Our Frameworks</span>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
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
      name: 'Angular',
      title: 'The Angular Framework',
      image: '/angular.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    },
    {
      name: 'Node.js',
      title: 'The Node.js Framework',
      image: '/nodejs.svg',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      points: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Sed do eiusmod tempor', 'Incididunt ut labore', 'Et dolore magna aliqua', 'Ut enim ad minim veniam']
    }
  ]
  
  const selectedFramework = ref(null)
  const isMobile = ref(false)
  let debounceTimeout = null
  
  const debouncedSelectFramework = (framework) => {
    if (isMobile.value) return
  
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      selectedFramework.value = framework
    }, 100) // 100ms delay
  }
  
  const handleFrameworkClick = (framework) => {
    if (isMobile.value) {
      selectedFramework.value = selectedFramework.value === framework ? null : framework
    }
  }
  
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 1024
  }
  
  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
  })
  
  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
  })
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
  
  @keyframes bounce-vertical {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  .hover\:animate-bounce-vertical:hover {
    animation: bounce-vertical 0.5s ease-in-out;
  }
  
  @media (max-width: 1023px) {
    .hover\:animate-bounce-vertical:hover {
      animation: none;
    }
  }
  </style>