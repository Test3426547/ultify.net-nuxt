<template>
  <div class="about-us-details">
    <div class="container">
      <h1 class="main-title">ULTIFY's Essentials</h1>
      <section v-for="(section, index) in sections" :key="index" class="about-section" :class="{ 'text-right': index % 2 !== 0 }">
        <div class="row align-items-center">
          <div :class="['col-lg-6', { 'order-lg-2': index % 2 !== 0 }]">
            <div class="content-wrapper" :class="{ 'ml-auto': index % 2 !== 0 }">
              <div class="number">{{ section.number }}/</div>
              <div class="pill-wrapper">
                <div class="pill">{{ section.title }}</div>
              </div>
              <p class="description">{{ section.description }}</p>
            </div>
          </div>
          <div :class="['col-lg-6', { 'order-lg-1': index % 2 !== 0 }]">
            <div class="image-wrapper" :class="{ 'ml-auto': index % 2 === 0 }">
              <img :src="section.image" :alt="'About Us ' + section.number" class="img-fluid rounded-image">
            </div>
          </div>
        </div>
      </section>
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

<style scoped>
.about-us-details {
  background-color: var(--bs-light);
  padding: 100px 0 80px; /* Increased top padding to 100px */
}

.main-title {
  font-size: 3rem;
  font-weight: bold;
  color: var(--bs-primary);
  text-align: center;
  margin-bottom: 80px; /* Added 80px spacing below the title */
}

.about-section {
  padding: 2.5rem 0;
  margin-bottom: 80px;
}

.about-section:last-child {
  margin-bottom: 0;
}

.container {
  max-width: 1400px;
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
}

.row {
  display: flex;
  align-items: center;
  margin-left: -15px;
  margin-right: -15px;
}

.col-lg-6 {
  padding-left: 15px;
  padding-right: 15px;
  width: 50%;
}

.content-wrapper {
  max-width: 90%;
}

.content-wrapper.ml-auto {
  margin-left: auto;
}

.number {
  font-size: 1.2rem;
  color: var(--bs-gray-600);
  margin-bottom: 1rem;
}

.pill-wrapper {
  margin-bottom: 2rem;
}

.pill {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: var(--bs-primary);
  color: white;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--bs-gray-700);
}

.image-wrapper {
  width: 100%;
  max-width: 540px;
}

.image-wrapper.ml-auto {
  margin-left: auto;
}

.rounded-image {
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 400px;
  object-fit: cover;
}

@media (max-width: 1399.98px) {
  .container {
    max-width: 100%;
  }
}

@media (max-width: 991.98px) {
  .about-section {
    padding: 1.5rem 0;
    margin-bottom: 40px;
  }

  .row {
    flex-direction: column;
  }

  .col-lg-6 {
    width: 100%;
  }

  .content-wrapper {
    max-width: 100%;
    margin-bottom: 2rem;
  }

  .image-wrapper {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}

@media (max-width: 767.98px) {
  .pill {
    font-size: 1.2rem;
  }

  .description {
    font-size: 1rem;
  }

  .rounded-image {
    height: 300px;
  }
}
</style>