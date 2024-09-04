<template>
  <section class="min-h-screen bg-ultify-grey flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl w-full">
      <h2 ref="mainHeading" class="text-5xl md:text-6xl font-bold text-ultify-blue text-center mb-16 opacity-0">
        Our Consultation Guarantees
      </h2>
      <div class="flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12">
        <div ref="imageContainer" class="w-full lg:w-1/2 opacity-0">
          <Card class="overflow-hidden">
            <CardContent class="p-0">
              <img src="/consultation-01.webp" alt="Consultation Hero Image" class="w-full h-auto object-cover rounded-lg shadow-lg" />
            </CardContent>
          </Card>
        </div>
        <div ref="infoContainer" class="w-full lg:w-1/2 opacity-0">
          <Card>
            <CardContent class="space-y-8">
              <div v-for="(info, index) in infoSections" :key="index" class="space-y-2">
                <h3 class="text-2xl font-semibold text-ultify-blue">{{ info.title }}</h3>
                <p class="text-ultify-blue text-lg">{{ info.description }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { Card, CardContent } from '@/components/ui/card';

const mainHeading = ref(null);
const imageContainer = ref(null);
const infoContainer = ref(null);

const infoSections = [
  {
    title: "We protect your intellectual property.",
    description: "Our agency will provide NDA's to protect your intellectual property and confidential information."
  },
  {
    title: "No maximum time",
    description: "We provide in-depth consultations with no maximum time to ensure you get the information you need."
  },
  {
    title: "Certified Consultants",
    description: "Our consultations are managed by real business consultants who have passed our extensive certification checklist."
  }
];

onMounted(() => {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(mainHeading.value, { opacity: 1, y: 0, duration: 1 })
    .to(imageContainer.value, { opacity: 1, x: 0, duration: 1 }, '-=0.5')
    .to(infoContainer.value, { opacity: 1, x: 0, duration: 1 }, '-=0.5');
});
</script>