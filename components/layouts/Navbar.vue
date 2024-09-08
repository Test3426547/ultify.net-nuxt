<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div v-if="state.loading.navbar" class="text-center">
      <p class="text-lg text-white">Loading...</p>
    </div>
    <div v-else-if="state.error" class="text-center">
      <p class="text-lg text-red-600">An error occurred while fetching data: {{ state.error }}</p>
    </div>
    <div v-else-if="navbarData" class="container mx-auto px-4 py-2 flex justify-between items-center">
      <a href="/" class="fixed top-6 left-6 z-[1060]">
        <img src="/ultify.svg" alt="Ultify Logo" class="h-[75px] w-auto">
      </a>
      <button @click="toggleMenu" class="fixed top-6 right-6 z-[1060] focus:outline-none" aria-label="Toggle navigation">
        <div class="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
          <div class="w-5 h-2.5 relative">
            <span class="block absolute h-0.5 w-full bg-black" :class="{ 'rotate-45 top-1/2': isMenuOpen, 'top-0': !isMenuOpen }"></span>
            <span class="block absolute h-0.5 w-full bg-black" :class="{ '-rotate-45 top-1/2': isMenuOpen, 'bottom-0': !isMenuOpen }"></span>
          </div>
        </div>
      </button>
    </div>
  </nav>

  <div v-if="navbarData" class="fixed inset-0 bg-emerald-500 transform transition-transform duration-300 ease-in-out z-[1050]"
       :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="h-full flex flex-col md:flex-row">
      <div class="md:w-1/2 flex justify-center items-center">
        <ul class="text-center space-y-12">
          <li v-for="page in navbarData.pages" :key="page.id">
            <a @click="navigateAndRefresh(page.link)" class="text-6xl md:text-7xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">{{ page.text }}</a>
          </li>
          <li>
            <div class="relative">
              <a @click="toggleServices" class="text-6xl md:text-7xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">
                Services
                <span class="ml-2 text-4xl">{{ isServicesOpen ? '▲' : '▼' }}</span>
              </a>
              <ul v-if="isServicesOpen" class="mt-4 space-y-2">
                <li v-for="service in navbarData.services" :key="service.id">
                  <a @click="navigateAndRefresh(service.link)" class="text-3xl text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer">{{ service.text }}</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <div class="md:w-1/2 flex items-center justify-center p-4">
        <div class="w-full max-w-xl">
          <h2 class="text-3xl font-bold text-white mb-4 text-center">{{ navbarData.title }}</h2>
          <form @submit.prevent="submitForm" class="space-y-4">
            <Input v-for="field in navbarData.fields" :key="field.id"
                   v-model="form[field.body]" :type="field.body.toLowerCase() === 'email' ? 'email' : 'text'"
                   :placeholder="field.body"
                   class="w-full px-6 py-4 text-lg rounded-full bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Textarea v-model="form.message" :placeholder="navbarData.message" rows="6"
                      class="w-full px-6 py-4 text-lg rounded-3xl bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Button type="submit" class="w-full px-6 py-4 text-lg rounded-full bg-white text-emerald-500 font-bold hover:bg-gray-100 transition-colors duration-300">
              {{ navbarData.button }}
            </Button>
          </form>
        </div>
      </div>
    </div>
    <button @click="toggleMenu" class="absolute top-6 right-6 z-[1060] focus:outline-none" aria-label="Close navigation">
      <div class="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
        <div class="w-5 h-2.5 relative">
          <span class="block absolute h-0.5 w-full bg-black rotate-45 top-1/2"></span>
          <span class="block absolute h-0.5 w-full bg-black -rotate-45 top-1/2"></span>
        </div>
      </div>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useDataStore } from '@/stores'
import { Input } from '@/components/ui/input.vue'
import Textarea from '@/components/ui/textarea.vue'
import { Button } from '@/components/ui/button.vue'
import gsap from 'gsap'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const navbarData = computed(() => state.value.navbarData)
const isMenuOpen = ref(false)

const form = ref({
  message: ''
})

const isServicesOpen = ref(false)

// Initialize form fields dynamically based on navbarData
watch(navbarData, (newNavbarData) => {
  if (newNavbarData && newNavbarData.fields) {
    newNavbarData.fields.forEach((field) => {
      form.value[field.body] = ''
    })
  }
}, { immediate: true })

// Initial data fetch
await dataStore.fetchNavbarData()

// Watch for route changes
watch(() => route.path, async () => {
  await dataStore.fetchNavbarData()
})

const refreshNavbarData = async (): Promise<void> => {
  await dataStore.fetchNavbarData()
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const toggleServices = () => {
  isServicesOpen.value = !isServicesOpen.value
}

const navigateAndRefresh = async (path: string) => {
  toggleMenu()
  await router.push(path)
  // After navigation, refresh the header data
  const headerComponent = document.querySelector('header')?.querySelector('script')
  if (headerComponent && 'refreshHeaderData' in headerComponent) {
    await (headerComponent as any).refreshHeaderData()
  }
}

const submitForm = () => {
  // Implement form submission logic here
  console.log('Form submitted:', form.value)
  // Reset form after submission
  Object.keys(form.value).forEach(key => {
    form.value[key] = ''
  })
}

onMounted(() => {
  const menuItems = document.querySelectorAll('[ref="menuItem"]')
  menuItems.forEach((item: Element) => {
    const menuItem = item as HTMLElement;
    gsap.set(menuItem, { y: 10, opacity: 0 });
    
    const enterAnimation = gsap.to(menuItem, {
      y: 0,
      opacity: 1,
      duration: 0.3,
      paused: true,
      ease: 'power2.out',
    });
    
    const leaveAnimation = gsap.to(menuItem, {
      y: 10,
      opacity: 0,
      duration: 0.2,
      paused: true,
      ease: 'power2.inOut',
    });
    
    menuItem.addEventListener('mouseenter', () => enterAnimation.play());
    menuItem.addEventListener('mouseleave', () => leaveAnimation.play());
  });
});

defineExpose({ refreshNavbarData })
</script>

<style scoped>
/* Add any scoped styles here if needed */
</style>