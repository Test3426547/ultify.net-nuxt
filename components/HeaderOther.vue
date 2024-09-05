<template>
    <div class="relative h-screen w-full overflow-hidden">
      <!-- Background Image -->
      <img
        src="/path-to-your-image.jpg"
        alt="Team working together"
        class="absolute inset-0 w-full h-full object-cover"
      />
  
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-50"></div>
  
      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Learn More About Us
        </h1>
        <p class="text-xl sm:text-2xl text-white mb-8 max-w-2xl">
          Need to get in contact with us?<br>
          Our email and phone number are at your disposal.
        </p>
        <a
          href="#contact"
          class="bg-ultify-blue text-white font-bold py-3 px-8 rounded-full hover:bg-blue-600 transition duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional script needed for this component
  </script>
  
  <style scoped>
  /* Any additional styles can be added here if needed */
  </style>