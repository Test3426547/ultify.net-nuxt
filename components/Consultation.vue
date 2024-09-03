<template>
  <section class="bg-ultify-blue py-16 md:py-32">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row md:space-x-8">
        <!-- Image Section -->
        <div class="md:w-1/2 mb-8 md:mb-0">
          <div class="rounded-[2rem] overflow-hidden shadow-lg" style="height: 650px;">
            <img src="/home-15.webp" alt="Consultation Image" class="w-full h-full object-cover object-top">
          </div>
        </div>

        <!-- Form Section -->
        <div class="md:w-1/2">
          <div class="bg-ultify-grey rounded-[2rem] shadow-lg p-8 md:p-12" style="height: 650px;">
            <h2 class="text-3xl md:text-4xl font-bold text-black mb-8 text-center">Book A Free Consultation Now</h2>
            <form @submit.prevent="handleSubmit" class="space-y-6 -mt-12">
              <div class="relative">
                <input 
                  id="businessName" 
                  v-model="form.businessName" 
                  type="text" 
                  class="w-full pl-4 pr-4 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
                  placeholder="URL/Business Name (if applicable)"
                >
              </div>
              <div class="relative">
                <input 
                  id="name" 
                  v-model="form.name" 
                  type="text" 
                  class="w-full pl-4 pr-4 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
                  placeholder="Name"
                >
              </div>
              <div class="relative">
                <input 
                  id="email" 
                  v-model="form.email" 
                  type="email" 
                  class="w-full pl-4 pr-4 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
                  placeholder="Email"
                >
              </div>
              <div class="relative">
                <input 
                  id="phone" 
                  v-model="form.phone" 
                  type="tel" 
                  class="w-full pl-4 pr-4 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
                  placeholder="Phone"
                >
              </div>
              <button 
                type="submit" 
                class="w-full bg-ultify-blue text-white font-bold py-3 px-6 rounded-full hover:bg-ultify-blue-dark transition duration-300"
              >
                LEAD WITHOUT A SWEAT
              </button>
            </form>
            <p class="text-xs text-black mt-12 text-center">
              You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  businessName: '',
  name: '',
  email: '',
  phone: ''
})

const handleSubmit = () => {
  // Implement form submission logic here
  console.log('Form submitted:', form.value)
}
</script>

<style scoped>
input::placeholder {
  text-align: left;
}
</style>