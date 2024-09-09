<template>
    <div class="min-h-screen bg-ultify-dark-grey py-8 sm:py-12 px-4 sm:px-6 lg:px-8 flex flex-col">
      <div class="flex flex-col lg:flex-row max-w-7xl mx-auto w-full">
        <!-- Left side - CMS details -->
        <div class="lg:w-1/2 mt-8 lg:mt-0 relative lg:top-[-50px] order-2 lg:order-1">
          <transition name="fade">
            <div v-if="selectedCMS" class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col mt-8 sm:mt-16 lg:mt-[100px]">
              <div class="w-full h-0 pb-[60%] relative overflow-hidden">
                <img :src="selectedCMS.image" :alt="selectedCMS.name" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-4 sm:p-6 flex-grow">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">{{ selectedCMS.title }}</h3>
                <p class="text-white mb-6">{{ selectedCMS.description }}</p>
                <div class="flex flex-col sm:flex-row">
                  <ul class="space-y-2 sm:w-1/2 sm:pr-2 mb-4 sm:mb-0">
                    <li v-for="(point, index) in selectedCMS.points.slice(0, 3)" :key="index" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white text-sm sm:text-base">{{ point }}</span>
                    </li>
                  </ul>
                  <ul class="space-y-2 sm:w-1/2 sm:pl-2">
                    <li v-for="(point, index) in selectedCMS.points.slice(3, 6)" :key="index + 3" class="flex items-center">
                      <span class="w-4 h-px bg-white mr-2"></span>
                      <span class="text-white text-sm sm:text-base">{{ point }}</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-6 flex items-center text-white cursor-pointer group">
                  <span class="text-base sm:text-lg font-semibold">Read More About Our CMS</span>
                  <ArrowRightIcon class="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:animate-bounce-horizontal" />
                </div>
              </div>
            </div>
            <div v-else class="bg-transparent rounded-lg overflow-hidden h-full flex flex-col mt-8 sm:mt-16 lg:mt-[100px]">
              <div class="w-full h-0 pb-[60%] relative overflow-hidden">
                <img src="/website-03m.png" alt="Default CMS Image" class="absolute inset-0 w-full h-full object-contain">
              </div>
              <div class="p-4 sm:p-6 flex-grow">
                <h3 class="text-xl sm:text-2xl font-bold text-white mb-4">Our CMS Technology</h3>
                <p class="text-white mb-6">
                  We specialize in various CMS platforms to deliver efficient content management solutions. 
                  Our expertise is not limited to these technologies, and we can work with other CMS platforms as well.
                </p>
                <div class="mt-6 flex items-center text-white cursor-pointer group">
                  <span class="text-base sm:text-lg font-semibold">Read More About Our CMS</span>
                  <ArrowRightIcon class="w-5 h-5 sm:w-6 sm:h-6 ml-2 group-hover:animate-bounce-horizontal" />
                </div>
              </div>
            </div>
          </transition>
        </div>
  
        <!-- Right side - CMS options -->
        <div class="lg:w-1/2 lg:pl-8 relative lg:top-[-80px] order-1 lg:order-2">
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-8 sm:mb-16 text-center lg:text-right mt-8 sm:mt-16 lg:mt-[100px]">Our CMS Technology</h1>
          <h2 class="text-2xl sm:text-3xl font-semibold text-white mb-6 sm:mb-8 text-center lg:text-right mt-8 sm:mt-16 lg:mt-[70px]">WE SPECIALIZE IN</h2>
          <ul class="text-center lg:text-right space-y-4 sm:space-y-8">
            <li v-for="(cms, index) in cmsTechnologies" :key="index" 
                class="block">
              <span 
                class="px-4 sm:px-6 py-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white border-2 border-white rounded-full cursor-pointer transition-all duration-300 inline-block hover:animate-bounce-vertical"
                @mouseover="debouncedSelectCMS(cms)"
                @mouseleave="debouncedSelectCMS(null)"
                @click="handleCMSClick(cms)"
              >
                {{ cms.name }} SEO
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { ArrowRightIcon } from '@heroicons/vue/24/solid'
  
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
  const isMobile = ref(false)
  let debounceTimeout = null
  
  const debouncedSelectCMS = (cms) => {
    if (isMobile.value) return
  
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      selectedCMS.value = cms
    }, 100) // 100ms delay
  }
  
  const handleCMSClick = (cms) => {
    if (isMobile.value) {
      selectedCMS.value = selectedCMS.value === cms ? null : cms
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
    50% { transform: translateX(10px); }
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