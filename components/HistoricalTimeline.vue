<template>
  <section class="timeline-section py-12 bg-primary">
    <div class="container mx-auto px-4 relative">
      <h2 class="text-6xl font-bold text-center mb-12 text-white">Historical Timeline</h2>
      <div class="timeline-container">
        <div v-for="(item, index) in timelineData" :key="index" class="timeline-item" :class="{ 'active': index === activeIndex }">
          <div class="timeline-content bg-white rounded-lg shadow-lg p-6">
            <h3 class="timeline-year text-primary">{{ item.year }}</h3>
            <p class="timeline-description text-primary">{{ item.description }}</p>
          </div>
        </div>
      </div>
      <div class="timeline-navigation">
        <button @click="prevItem" :disabled="activeIndex === 0" class="text-white">&lt;</button>
        <button @click="nextItem" :disabled="activeIndex === timelineData.length - 1" class="text-white">&gt;</button>
      </div>
      <img src="/chatbot-icon.png" alt="Ultify Logo" class="absolute right-0 top-0 w-1/4 max-w-xs">
    </div>
  </section>
</template>

<script>
export default {
  name: 'HistoricalTimeline',
  data() {
    return {
      activeIndex: 0,
      timelineData: [
        {
          year: '2019',
          description: 'Our Co-Founders began their first venture by offering high-quality website design, SEO, and content creation services for leading agencies in Australia.'
        },
        {
          year: '2020',
          description: 'We decided it was the right time to venture into our own branded business, starting with the intention of gaining as much experience as possible.'
        },
        {
          year: '2021',
          description: 'Our agency had a rough start, so we decided to intern for a leading digital marketing agency while running our business. This experience gave us insights into working with top brands in Australia, perfecting and developing our strategies.'
        },
        {
          year: '2022',
          description: 'We rebranded to ULTIFY Solutions, operating as a private digital marketing agency, servicing our clients with an improved and larger range of comprehensive services.'
        },
        {
          year: '2023',
          description: 'Our agency decided it was the right time to go public and accept all clients and businesses with our solidified strategies. We are honored to have worked with leading companies and businesses of all sorts through our business, ULTIFY Solutions, bringing our tailored techniques to their craft.'
        }
      ]
    };
  },
  methods: {
    prevItem() {
      if (this.activeIndex > 0) {
        this.activeIndex--;
      }
    },
    nextItem() {
      if (this.activeIndex < this.timelineData.length - 1) {
        this.activeIndex++;
      }
    }
  }
};
</script>

<style scoped>
.timeline-section {
  overflow: hidden;
}

.timeline-container {
  position: relative;
  height: 400px;
  perspective: 1000px;
}

.timeline-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transform: translateZ(-400px) rotateY(45deg);
  transition: all 0.5s ease-out;
}

.timeline-item.active {
  opacity: 1;
  transform: translateZ(0) rotateY(0);
}

.timeline-year {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.timeline-description {
  font-size: 1.1rem;
  line-height: 1.6;
}

.timeline-navigation {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.timeline-navigation button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.timeline-navigation button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
}

.timeline-navigation button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>