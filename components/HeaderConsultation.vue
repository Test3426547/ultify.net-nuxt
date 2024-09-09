<template>
  <section class="relative min-h-screen w-full overflow-hidden flex items-center">
    <div class="absolute inset-0 bg-cover bg-center" style="background-image: url('/contact-us-01.webp');"></div>
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-between h-full py-16">
      <div class="mt-[-150px]">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white mb-4 sm:mb-6 lg:mb-8">Our Impactful Consultation System</h1>
        <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white mb-6 sm:mb-8 lg:mb-12">
          We heard you are ready to begin your digital journey!<br class="hidden sm:inline">Get talking to a suited expert for free, now!
        </p>
      </div>
      <div class="mt-[250px]"> <!-- Changed from mt-[150px] to mt-[250px] -->
        <a
          class="inline-flex h-16 sm:h-20 items-center justify-center rounded-full bg-emerald-500 px-8 sm:px-12 py-4 sm:py-6 text-xl sm:text-2xl font-medium text-white shadow-lg transition-colors hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
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