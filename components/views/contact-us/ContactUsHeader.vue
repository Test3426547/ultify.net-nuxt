<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img src="/sydney.jpeg" alt="Sydney Skyline" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-ultify-dark-grey/80 to-ultify-blue/50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <h1 ref="title" class="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 opacity-0 text-center">
        Ride the Digital Wave
      </h1>
      <p ref="subtitle" class="text-base sm:text-lg md:text-xl lg:text-2xl text-white mb-8 sm:mb-12 max-w-xs sm:max-w-lg md:max-w-2xl text-center opacity-0">
        Surf the digital currents with Sydney's premier marketing agency. Let's make waves together.
      </p>

      <!-- CTA Button -->
      <Button ref="ctaButton" variant="outline" size="lg" class="mt-6 sm:mt-8 opacity-0 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3">
        Start Your Journey
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const title = ref(null);
const subtitle = ref(null);
const ctaButton = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(title.value, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
    .to(subtitle.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
    .to(ctaButton.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
});
</script>

<style scoped>
@media (max-width: 640px) {
  .min-h-screen {
    min-height: calc(100vh - 60px); /* Adjust for mobile browser chrome */
  }
}
</style>