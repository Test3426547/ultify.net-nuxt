<template>
  <div class="relative min-h-screen w-full overflow-hidden">
    <!-- Background Image -->
    <img
      src="/path-to-your-image.jpg"
      alt="Team working together"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-center items-start h-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
        Learn More About Us
      </h1>
      <p class="text-lg sm:text-xl md:text-2xl text-white mb-6 sm:mb-8 max-w-2xl">
        Need to get in contact with us?<br class="hidden sm:inline">
        Our email and phone number are at your disposal.
      </p>
      <a
        href="#contact"
        class="bg-ultify-blue text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-blue-600 transition duration-300 text-base sm:text-lg"
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
@media (max-width: 640px) {
  .min-h-screen {
    min-height: calc(100vh - 60px); /* Adjust for mobile browser chrome */
  }
}
</style>