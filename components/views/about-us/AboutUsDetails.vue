<template>
  <div class="bg-ultify-grey py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-5xl font-bold text-emerald-500 text-center mb-20">ULTIFY's Essentials</h1>
      <div v-for="(section, index) in sections" :key="index" class="mb-20 last:mb-0">
        <div :class="['flex flex-col lg:flex-row items-center', { 'lg:flex-row-reverse': index % 2 !== 0 }]">
          <div class="lg:w-1/2 mb-8 lg:mb-0">
            <div :class="['max-w-xl', { 'lg:ml-auto': index % 2 !== 0 }]">
              <div class="text-xl text-gray-600 mb-4">{{ section.number }}/</div>
              <div class="inline-block px-6 py-2 bg-emerald-500 text-white rounded-full text-2xl font-bold mb-6">
                {{ section.title }}
              </div>
              <p class="text-lg text-gray-700 leading-relaxed">{{ section.description }}</p>
            </div>
          </div>
          <div class="lg:w-1/2">
            <div :class="['max-w-lg', { 'lg:ml-auto': index % 2 === 0 }]">
              <img :src="section.image" :alt="'About Us ' + section.number" class="rounded-3xl shadow-lg w-full h-96 object-cover">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const sections = [
  {
    number: '01',
    title: 'Two minds is better than one',
    description: 'Our Agency produces success from the core principles of teamwork and collective thinking, which we apply within our team and collaborations.',
    image: '/about-us-01.webp'
  },
  {
    number: '02',
    title: 'Not giving up until it\'s perfect',
    description: 'Our dedicated and passionate team strive for greatness and feed of the challenge of problem solving. We understand that failure is apart of success!',
    image: '/about-us-02.webp'
  },
  {
    number: '03',
    title: 'Our time is your time',
    description: 'ULTIFY appreciates and respects the opportunity and time provided by our clients, our agency ensures to utilise both parties time in the most effecient way with proportion to industry standards.',
    image: '/about-us-03.webp'
  },
  {
    number: '04',
    title: 'Our skills and your idea',
    description: 'Combining our experience and expertise with your idea and vision, we aim to achieve a high-class project which will bring us many more!',
    image: '/about-us-04.webp'
  }
];
</script>