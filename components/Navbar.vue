<template>
  <nav class="fixed top-0 left-0 right-0 z-50 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <NuxtLink to="/" class="flex-shrink-0">
        <img src="/ultify.svg" alt="Ultify Logo" class="h-[75px] w-auto">
      </NuxtLink>
      <Button variant="ghost" size="icon" @click="toggleMenu" class="relative z-50" aria-label="Toggle navigation">
        <div class="w-10 h-10 border-2 border-black rounded-full flex items-center justify-center">
          <div v-if="!isMenuOpen" class="w-5 h-2.5 flex flex-col justify-between">
            <span class="w-full h-0.5 bg-black"></span>
            <span class="w-full h-0.5 bg-black"></span>
          </div>
          <div v-else class="w-5 h-5 relative">
            <span class="absolute w-full h-0.5 bg-black top-1/2 left-0 -translate-y-1/2 rotate-45"></span>
            <span class="absolute w-full h-0.5 bg-black top-1/2 left-0 -translate-y-1/2 -rotate-45"></span>
          </div>
        </div>
      </Button>
    </div>
  </nav>

  <Sheet :open="isMenuOpen" @close="closeMenu">
    <SheetContent side="right" class="w-full sm:max-w-none bg-emerald-500 p-0">
      <div class="flex flex-col md:flex-row h-full">
        <div class="md:w-1/2 flex justify-center items-center">
          <ul class="space-y-8 text-center">
            <li><Button variant="ghost" size="lg" @click="navigateAndRefresh('/')" class="text-white text-5xl font-bold hover:text-emerald-200">Home</Button></li>
            <li class="relative">
              <Button variant="ghost" size="lg" @click="toggleServices" class="text-white text-5xl font-bold hover:text-emerald-200">
                Services <ChevronDown :class="{ 'rotate-180': showServices }" class="ml-2 h-8 w-8 transition-transform" />
              </Button>
              <Collapse :when="showServices">
                <ul class="mt-4 space-y-4">
                  <li v-for="service in services" :key="service.path">
                    <Button variant="ghost" size="lg" @click="navigateAndRefresh(service.path)" class="text-white text-3xl font-bold hover:text-emerald-200">{{ service.name }}</Button>
                  </li>
                </ul>
              </Collapse>
            </li>
            <li><Button variant="ghost" size="lg" @click="navigateAndRefresh('/about-us')" class="text-white text-5xl font-bold hover:text-emerald-200">About Us</Button></li>
            <li><Button variant="ghost" size="lg" @click="navigateAndRefresh('/consultation')" class="text-white text-5xl font-bold hover:text-emerald-200">Consultation</Button></li>
            <li><Button variant="ghost" size="lg" @click="navigateAndRefresh('/contact-us')" class="text-white text-5xl font-bold hover:text-emerald-200">Contact Us</Button></li>
          </ul>
        </div>
        <div class="md:w-1/2 flex items-center justify-center p-8">
          <div class="w-full max-w-xl">
            <h2 class="text-3xl font-bold text-white mb-4 text-center">Get in touch.</h2>
            <form @submit.prevent="submitForm" class="space-y-4">
              <Input v-model="form.name" type="text" placeholder="Name" class="bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100" />
              <Input v-model="form.email" type="email" placeholder="Email" class="bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100" />
              <Input v-model="form.website" type="text" placeholder="Enter your company website" class="bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100" />
              <Textarea v-model="form.message" placeholder="Message" rows="6" class="bg-white text-emerald-500 placeholder-emerald-500 hover:bg-gray-100 rounded-3xl" />
              <Button type="submit" class="w-full bg-white text-emerald-500 hover:bg-gray-100">Here Back From Us Now</Button>
            </form>
          </div>
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Collapse } from '@/components/ui/collapse'
import { ChevronDown } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const showServices = ref(false)
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  website: '',
  message: ''
})

const services = [
  { name: 'Website', path: '/website' },
  { name: 'Social Media', path: '/social-media' },
  { name: 'SEO', path: '/seo' },
  { name: 'Paid Media', path: '/paid-media' },
  { name: 'Content Creation', path: '/content-creation' },
  { name: 'Print Advertising', path: '/print-advertising' },
]

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    showServices.value = false
  }
}

const closeMenu = () => {
  isMenuOpen.value = false
  showServices.value = false
}

const toggleServices = () => {
  showServices.value = !showServices.value
}

const navigateAndRefresh = async (path: string) => {
  closeMenu()
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

onMounted(() => {
  // Any necessary mounted logic
})

router.afterEach(() => {
  closeMenu()
})
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>