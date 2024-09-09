<template>
  <section class="relative min-h-screen w-full overflow-hidden flex items-center">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/about-us-05.webp');"></div>
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">Learn More About Us</h1>
      <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6 sm:mb-8 lg:mb-12">
        Need to get in contact with us?<br class="hidden sm:inline">Our email and phone number are at your disposal.
      </p>
      <div>
        <a
          class="inline-flex h-12 sm:h-14 items-center justify-center rounded-full bg-emerald-500 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-medium text-white shadow-sm transition-colors hover:bg-[#37B5FF]/90 focus:outline-none focus:ring-2 focus:ring-[#37B5FF] focus:ring-offset-2"
          href="/consultation"
        >
          Contact Us
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script setup needed
</script>

<style scoped>
@media (max-width: 640px) {
  .min-h-screen {
    min-height: calc(100vh - 60px); /* Adjust for mobile browser chrome */
  }
}
</style>