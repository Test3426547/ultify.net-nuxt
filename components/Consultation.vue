<template>
  <div class="bg-ultify-blue min-h-screen flex items-center justify-center p-4 md:p-8">
    <div class="flex flex-col md:flex-row max-w-6xl w-full bg-ultify-blue rounded-3xl overflow-hidden shadow-2xl">
      <div class="md:w-1/2 p-6 md:p-12">
        <img src="/home-15.webp" alt="Woman smiling at laptop" class="w-full h-full object-cover rounded-3xl" />
      </div>
      <div class="md:w-1/2 bg-ultify-grey p-6 md:p-12 rounded-3xl">
        <h2 class="text-3xl md:text-4xl font-bold text-black mb-6 text-center">Book A Free Consultation Now</h2>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label for="business" class="sr-only">URL/Business Name</label>
            <input
              id="business"
              v-model="form.business"
              type="text"
              placeholder="URL/Business Name (if applicable)"
              class="w-full px-6 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
              required
            />
          </div>
          <div>
            <label for="name" class="sr-only">Name</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Name"
              class="w-full px-6 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
              required
            />
          </div>
          <div>
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Email"
              class="w-full px-6 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
              required
            />
          </div>
          <div>
            <label for="phone" class="sr-only">Phone</label>
            <input
              id="phone"
              v-model="form.phone"
              type="tel"
              placeholder="Phone"
              class="w-full px-6 py-3 bg-white text-ultify-grey placeholder-ultify-grey rounded-full focus:outline-none focus:ring-2 focus:ring-ultify-blue"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-ultify-blue text-white font-bold py-3 px-6 rounded-full hover:bg-ultify-blue-dark transition duration-300"
          >
            LEAD WITHOUT A SWEAT
          </button>
        </form>
        <p class="text-sm text-ultify-grey mt-4 text-center">
          You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  business: '',
  name: '',
  email: '',
  phone: ''
})

const submitForm = () => {
  // Handle form submission here
  console.log('Form submitted:', form.value)
  // You can add your form submission logic here, such as sending data to an API
}
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>