<template>
  <section class="bg-[#37B5FF] py-16 px-4 sm:px-6 lg:px-8 relative">
    <div class="max-w-7xl mx-auto">
      <div class="flex flex-col lg:flex-row justify-between items-start">
        <!-- Left side - Category buttons -->
        <div class="w-full lg:w-1/3 mb-8 lg:mb-0">
          <div class="space-y-4 mt-[50px]">
            <button 
              v-for="category in categories" 
              :key="category" 
              @click="selectCategory(category)"
              :class="[
                'w-full py-2 px-4 rounded-full border-2 transition-colors duration-300',
                selectedCategory === category 
                  ? 'bg-white text-[#37B5FF] border-white' 
                  : 'border-white text-white hover:bg-white hover:text-[#37B5FF]'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>

        <!-- Right side - Contact form -->
        <div class="w-full lg:w-1/2 relative">
          <h2 class="text-3xl font-bold text-white mb-6 text-center absolute top-0 left-0 right-0">Get in touch.</h2>
          <form @submit.prevent="submitForm" class="space-y-4 mt-[+50px]">
            <div>
              <input type="text" id="name" v-model="form.name" placeholder="Name" class="w-full px-4 py-2 rounded-full border-2 border-white bg-[#37B5FF] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white">
            </div>
            <div>
              <input type="email" id="email" v-model="form.email" placeholder="Email" class="w-full px-4 py-2 rounded-full border-2 border-white bg-[#37B5FF] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white">
            </div>
            <div>
              <input type="text" id="website" v-model="form.website" placeholder="Enter your company website (if applicable)" class="w-full px-4 py-2 rounded-full border-2 border-white bg-[#37B5FF] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white">
            </div>
            <div>
              <textarea id="message" v-model="form.message" placeholder="Message" rows="8" class="w-full px-4 py-2 rounded-3xl border-2 border-white bg-[#37B5FF] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"></textarea>
            </div>
            <div>
              <button type="submit" class="w-full py-2 px-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#37B5FF] transition-colors duration-300">
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