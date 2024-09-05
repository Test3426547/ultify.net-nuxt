<template>
  <nav class="fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4 py-2 flex justify-between items-center">
      <NuxtLink to="/" class="flex-shrink-0">
        <img src="/ultify.svg" alt="Ultify Logo" class="h-[75px] w-auto">
      </NuxtLink>
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

  <div class="fixed inset-0 bg-emerald-500 transform transition-transform duration-300 ease-in-out z-[1050]"
       :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'">
    <div class="h-full flex flex-col md:flex-row">
      <div class="md:w-1/2 flex justify-center items-center">
        <ul class="text-center space-y-8">
          <li><a @click="navigateAndRefresh('/')" class="text-4xl md:text-5xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">Home</a></li>
          <li class="relative">
            <a @click="toggleServices" class="text-4xl md:text-5xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer flex items-center justify-center" ref="menuItem">
              Services
              <svg :class="{ 'rotate-180': showServices }" class="w-6 h-6 ml-2 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </a>
            <ul v-if="showServices" class="mt-4 space-y-4">
              <li v-for="service in services" :key="service.path">
                <a @click="navigateAndRefresh(service.path)" class="text-2xl md:text-3xl font-semibold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">{{ service.name }}</a>
              </li>
            </ul>
          </li>
          <li><a @click="navigateAndRefresh('/about-us')" class="text-4xl md:text-5xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">About Us</a></li>
          <li><a @click="navigateAndRefresh('/consultation')" class="text-4xl md:text-5xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">Consultation</a></li>
          <li><a @click="navigateAndRefresh('/contact-us')" class="text-4xl md:text-5xl font-bold text-white hover:text-opacity-80 transition-colors duration-300 cursor-pointer" ref="menuItem">Contact Us</a></li>
        </ul>
      </div>
      <div class="md:w-1/2 flex items-center justify-center p-4">
        <div class="w-full max-w-xl">
          <h2 class="text-3xl font-bold text-white mb-4 text-center">Get in touch.</h2>
          <form @submit.prevent="submitForm" class="space-y-4">
            <Input v-model="form.name" type="text" placeholder="Name" class="w-full px-5 py-3 text-base rounded-full bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Input v-model="form.email" type="email" placeholder="Email" class="w-full px-5 py-3 text-base rounded-full bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Input v-model="form.website" type="text" placeholder="Enter your company website" class="w-full px-5 py-3 text-base rounded-full bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Textarea v-model="form.message" placeholder="Message" rows="6" class="w-full px-5 py-3 text-base rounded-3xl bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 transition-colors duration-300" />
            <Button type="submit" class="w-full px-5 py-3 text-base rounded-full bg-white text-emerald-500 font-bold hover:bg-gray-100 transition-colors duration-300">
              Hear Back From Us Now
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import Textarea from '@/components/ui/textarea.vue'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'

const isMenuOpen = ref(false)
const showServices = ref(false)
const router = useRouter()

const services = [
  { name: 'Website', path: '/website' },
  { name: 'Social Media', path: '/social-media' },
  { name: 'SEO', path: '/seo' },
  { name: 'Paid Media', path: '/paid-media' },
  { name: 'Content Creation', path: '/content-creation' },
  { name: 'Print Advertising', path: '/print-advertising' },
]

const form = ref({
  name: '',
  email: '',
  website: '',
  message: ''
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    showServices.value = false
  }
}

const toggleServices = () => {
  showServices.value = !showServices.value
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
  form.value = { name: '', email: '', website: '', message: '' }
}

router.afterEach(() => {
  isMenuOpen.value = false
  showServices.value = false
})

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
</script>