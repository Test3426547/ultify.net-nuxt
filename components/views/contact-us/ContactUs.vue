<template>
  <section class="min-h-screen bg-ultify-dark-grey px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 flex flex-col justify-center">
    <div class="w-full max-w-7xl mx-auto">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 sm:mb-12 lg:mb-16 text-center -mt-[50px] sm:-mt-[75px] lg:-mt-[100px]">Get in touch.</h2>
      <div class="flex flex-col lg:flex-row justify-between items-start space-y-8 lg:space-y-0 lg:space-x-12">
        <!-- Left side - Category buttons -->
        <div class="w-full lg:w-1/3">
          <div class="space-y-3 sm:space-y-4 lg:space-y-5">
            <button 
              v-for="category in categories" 
              :key="category" 
              @click="selectCategory(category)"
              :class="[
                'w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border-2 transition-colors duration-300 text-base sm:text-lg font-bold',
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
          <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-5">
            <div>
              <input type="text" id="name" v-model="form.name" placeholder="Name" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-sm sm:text-base">
            </div>
            <div>
              <input type="email" id="email" v-model="form.email" placeholder="Email" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-sm sm:text-base">
            </div>
            <div>
              <input type="text" id="website" v-model="form.website" placeholder="Enter your company website (if applicable)" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-sm sm:text-base">
            </div>
            <div>
              <textarea id="message" v-model="form.message" placeholder="Message" rows="8" sm:rows="10" lg:rows="12" class="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-2xl border-2 border-white bg-white text-ultify-dark-grey placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-ultify-blue text-sm sm:text-base"></textarea>
            </div>
            <div>
              <button type="submit" class="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-full border-2 border-white text-white hover:bg-white hover:text-ultify-dark-grey transition-colors duration-300 text-base sm:text-lg font-bold">
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
@media (max-width: 1023px) {
  .lg\:space-x-12 {
    margin-left: 0;
    margin-right: 0;
  }
}
</style>