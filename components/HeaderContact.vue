<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img src="/sydney.jpeg" alt="Sydney Skyline" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-ultify-dark-grey/80 to-ultify-blue/50"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <h1 ref="title" class="text-5xl md:text-7xl font-bold text-white mb-6 opacity-0">
        Ride the Digital Wave
      </h1>
      <p ref="subtitle" class="text-xl md:text-2xl text-white mb-12 max-w-2xl text-center opacity-0">
        Surf the digital currents with Sydney's premier marketing agency. Let's make waves together.
      </p>
      
      <!-- Wave Animation -->
      <svg ref="wave" class="w-full h-32 opacity-0" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          fill="#ffffff"
          fill-opacity="0.2"
        ></path>
      </svg>

      <!-- CTA Button -->
      <Button ref="ctaButton" variant="outline" size="lg" class="mt-8 opacity-0">
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
const wave = ref(null);
const ctaButton = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(title.value, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
    .to(subtitle.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
    .to(wave.value, { opacity: 1, duration: 1 }, '-=0.5')
    .to(ctaButton.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5');

  // Animate the wave
  gsap.to(wave.value, {
    x: -200,
    repeat: -1,
    duration: 10,
    ease: 'linear',
  });
});
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>