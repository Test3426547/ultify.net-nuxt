<template>
  <div class="min-h-screen flex flex-col lg:flex-row relative overflow-hidden">
    <!-- Background with straight split -->
    <div class="absolute inset-0 z-0">
      <div class="h-full w-full lg:w-2/3 bg-emerald-500 float-left"></div>
      <div class="h-full w-full lg:w-1/3 bg-ultify-dark-grey float-right"></div>
    </div>

    <!-- Contact Form Section -->
    <div class="w-full lg:w-2/3 p-4 sm:p-8 lg:p-16 relative z-10 flex items-center justify-center">
      <Card class="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-3xl shadow-xl">
        <CardHeader>
          <CardTitle class="text-2xl sm:text-3xl font-bold text-ultify-dark-grey text-center">Book A Free Consultation Now</CardTitle>
        </CardHeader>
        <CardContent>
          <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-6">
            <div class="space-y-2">
              <Label for="url" class="sr-only">URL/Business Name</Label>
              <Input id="url" v-model="formData.url" placeholder="URL/Business Name (If applicable)" class="bg-gray-100 text-black placeholder-gray-500 rounded-full py-3 sm:py-4 px-4 sm:px-6 w-full" />
            </div>
            <div class="space-y-2">
              <Label for="name" class="sr-only">Name</Label>
              <Input id="name" v-model="formData.name" placeholder="Name" required class="bg-gray-100 text-black placeholder-gray-500 rounded-full py-3 sm:py-4 px-4 sm:px-6 w-full" />
            </div>
            <div class="space-y-2">
              <Label for="email" class="sr-only">Email</Label>
              <Input id="email" v-model="formData.email" type="email" placeholder="Email" required class="bg-gray-100 text-black placeholder-gray-500 rounded-full py-3 sm:py-4 px-4 sm:px-6 w-full" />
            </div>
            <div class="space-y-2">
              <Label for="phone" class="sr-only">Phone</Label>
              <Input id="phone" v-model="formData.phone" type="tel" placeholder="Phone" required class="bg-gray-100 text-black placeholder-gray-500 rounded-full py-3 sm:py-4 px-4 sm:px-6 w-full" />
            </div>
            <div class="space-y-2 select-wrapper">
              <Label for="service" class="sr-only">Service Category</Label>
              <Select
                v-model="formData.service"
                :options="serviceOptions"
                placeholder="Select a service category"
                class="bg-gray-100 text-black placeholder-gray-500 rounded-full py-3 sm:py-4 px-4 sm:px-6 w-full h-[46px] sm:h-[54px]"
              />
            </div>
            <div class="space-y-2">
              <Label for="message" class="sr-only">Message</Label>
              <Textarea v-model="formData.message" placeholder="Type your message here" rows="4" class="bg-gray-100 text-black placeholder-gray-500 rounded-3xl py-3 sm:py-4 px-4 sm:px-6 w-full" />
            </div>
            <Button type="submit" class="w-full bg-emerald-500 text-white hover:bg-emerald-600 rounded-full py-3 sm:py-4 text-base sm:text-lg font-semibold">
              LEAD WITHOUT A SWEAT
            </Button>
          </form>
          <p class="text-gray-600 text-center mt-4 sm:mt-6 text-xs sm:text-sm">
            You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
          </p>
        </CardContent>
      </Card>
    </div>

    <!-- Contact Information Section -->
    <div class="w-full lg:w-1/3 p-4 sm:p-8 lg:p-16 relative z-10 flex items-center justify-center bg-ultify-dark-grey">
      <div class="max-w-lg">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-white">ULTIFY SOLUTIONS</h2>
        <p class="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-white">If you need results, you need Ultify.</p>
        
        <div class="mb-6 sm:mb-8">
          <p class="font-bold mb-2 text-white text-sm sm:text-base">Level 25, 50 Clarent St, Wynyard, Sydney, NSW, 2000</p>
        </div>
        
        <div class="mb-6 sm:mb-8 text-white">
          <p class="flex items-center mb-2">
            <PhoneIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span class="text-sm sm:text-base">1800 ULTIFY</span>
          </p>
          <p class="flex items-center">
            <EnvelopeIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span class="text-sm sm:text-base">admin@ultify.net</span>
          </p>
        </div>
        
        <div class="flex space-x-4">
          <a href="#" aria-label="Instagram" class="text-white hover:text-gray-300 transition-colors duration-300">
            <InstagramIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="LinkedIn" class="text-white hover:text-gray-300 transition-colors duration-300">
            <LinkedinIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="Facebook" class="text-white hover:text-gray-300 transition-colors duration-300">
            <FacebookIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.vue'
import { Label } from '@/components/ui/label.vue'
import { Input } from '@/components/ui/input.vue'
import { Button } from '@/components/ui/button.vue'
import Select from '@/components/ui/select.vue'
import Textarea from '@/components/ui/textarea.vue'
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid'
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next'

const formData = ref({
  url: '',
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const serviceOptions = [
  { label: 'Website', value: 'website' },
  { label: 'Social Media', value: 'social-media' },
  { label: 'SEO', value: 'seo' },
  { label: 'Paid Media', value: 'paid-media' },
  { label: 'Content Creation', value: 'content-creation' },
  { label: 'Print Advertising', value: 'print-advertising' }
]

const submitForm = () => {
  console.log('Form submitted:', formData.value)
  // Add your form submission logic here
}
</script>

<style scoped>
@media (max-width: 1023px) {
  .bg-emerald-500,
  .bg-ultify-dark-grey {
    width: 100% !important;
    float: none !important;
  }
}

.select-wrapper :deep(.relative) {
  height: 46px;
}

.select-wrapper :deep(.relative button) {
  height: 100%;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
}

.select-wrapper :deep(.relative button span) {
  padding-left: 0;
  margin-left: -50px;
  color: #64748B;
}
</style>