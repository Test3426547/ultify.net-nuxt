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
const ctaButton = ref(null);

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(title.value, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
    .to(subtitle.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
    .to(ctaButton.value, { opacity: 1, y: 0, duration: 1 }, '-=0.5');
});
</script>