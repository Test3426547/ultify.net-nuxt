<template>
  <section class="min-h-screen bg-ultify-dark-grey py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <div class="w-full max-w-7xl mx-auto">
      <h2 class="text-6xl font-bold text-white mb-12 text-center">Get in touch.</h2>
      <div class="flex flex-col lg:flex-row justify-between items-start space-y-12 lg:space-y-0 lg:space-x-12">
        <!-- Left side - Category buttons -->
        <div class="w-full lg:w-1/3">
          <div class="space-y-6">
            <button 
              v-for="category in categories" 
              :key="category" 
              @click="selectCategory(category)"
              :class="[
                'w-full py-4 px-6 rounded-full border-4 transition-colors duration-300 text-xl font-extrabold',
                selectedCategory === category 
                  ? 'bg-white text-ultify-dark-grey border-white' 
                  : 'border-white text-white hover:bg-white hover:text-ultify-dark-grey'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Right side - Contact form -->
        <div class="w-full lg:w-1/2">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <input type="text" id="name" v-model="form.name" placeholder="Name" class="w-full px-6 py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-lg">
            </div>
            <div>
              <input type="email" id="email" v-model="form.email" placeholder="Email" class="w-full px-6 py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-lg">
            </div>
            <div>
              <input type="text" id="website" v-model="form.website" placeholder="Enter your company website (if applicable)" class="w-full px-6 py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-lg">
            </div>
            <div>
              <textarea id="message" v-model="form.message" placeholder="Message" rows="6" class="w-full px-6 py-4 rounded-3xl border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-lg"></textarea>
            </div>
            <div>
              <button type="submit" class="w-full py-4 px-6 rounded-full border-4 border-white text-white hover:bg-white hover:text-ultify-dark-grey transition-colors duration-300 text-xl font-extrabold">
                Hear Back From Us Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const categories = [
  'Website',
  'Social Media',
  'SEO',
  'Paid Media',
  'Content Creation',
  'Print Advertising',
  'Internship',
  'Sponsorship'
];

const selectedCategory = ref('');

const form = ref({
  name: '',
  email: '',
  website: '',
  message: ''
});

const selectCategory = (category) => {
  selectedCategory.value = category;
};

const submitForm = () => {
  // Handle form submission
  console.log('Form submitted:', form.value, 'Selected category:', selectedCategory.value);
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>