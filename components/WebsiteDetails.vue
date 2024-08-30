<template>
  <section class="service-details bg-light">
    <div class="container">
      <div class="service-row" v-for="(service, index) in services" :key="index">
        <div class="service-content" :class="{ 'right': index % 2 !== 0 }">
          <h2 class="service-title text-primary">{{ service.title }}</h2>
          <p class="service-description">{{ service.description }}</p>
        </div>
        <div class="service-image" :class="{ 'left': index % 2 !== 0 }">
          <img :src="service.image" :alt="service.title">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ServiceDetails',
  data() {
    return {
      services: [
        {
          title: 'Website Maintenance',
          description: 'We offer comprehensive website maintenance services to ensure your sites security, reliability, and performance. Our team conducts regular checks and updates to keep your site running smoothly.',
          image: '/website-08.png'
        },  
      
        {
          title: 'Website Management',
          description: 'ULTIFY provides comprehensive website management services to ensure your site is always up-to-date, secure, and performing at its best. Our services include regular updates, user experience improvements, and multimedia content management.',
          image: '/website-06.png'
        },
        {
          title: 'Website Design & Development',
          description: 'Need a custom designed, visually pleasing, highly optimized, and converting website? Let our team at ULTIFY handle all your website design and development needs. Our certified programmers and designers produce high-quality projects to help your business grow and outperform competitors in every aspect.',
          image: '/website-04.png'
        },
        {
          title: 'Mobile Conversion',
          description: 'Did you know that 86% of the world owns a smartphone, compared to only 25% owning a computer? This statistic emphasizes the importance of having a website optimized for all devices. At ULTIFY, we provide a highly optimized website for all devices, ensuring no loss in quality, conversion rates, or user experience.',
          image: '/website-05.png'
        },
        {
          title: 'Conversion Rate Optimization',
          description: 'What is the point of a website if it doesnt convert? At ULTIFY, we implement CRO strategies to maximize your sites effectiveness, driving more conversions and sales through meticulous analysis and A/B testing.',
          image: '/website-07.png'
        },
        {
          title: 'Website Audit & Strategy',
          description: 'Our audit and strategy services go beyond finding and fixing issues. We provide strategic guidance to unlock new opportunities and help your website reach its full potential.',
          image: '/website-09.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.service-details {
  padding: 200px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;  /* Adjusted to accommodate the new gap */
  margin: 0 auto;
  padding: 0 20px;
}

.service-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 200px;
}

.service-row:last-child {
  margin-bottom: 0;
}

.service-content, .service-image {
  flex-basis: calc(50% - 50px);  /* 50% width minus 65px for the gap */
  max-width: calc(50% - 50px);
}

.service-content {
  transform: translateX(-65px);
}

.service-content.right {
  order: 2;
  transform: translateX(65px);
}

.service-image {
  transform: translateX(65px);
}

.service-image.left {
  order: 1;
  transform: translateX(-65px);
}

.service-title {
  margin-bottom: 20px;
  font-size: 28px;
  color: #007bff;
}

.service-description {
  color: #34495e;
  line-height: 1.6;
  font-size: 16px;
}

.service-image img {
  max-width: 100%;
  height: auto;
  border-radius: 10px;
}

@media (max-width: 992px) {
  .container {
    padding: 0 40px;
  }

  .service-row {
    flex-direction: column;
    margin-bottom: 100px;
  }

  .service-content, .service-image {
    flex-basis: 100%;
    max-width: 100%;
    transform: none;
    margin-bottom: 30px;
  }

  .service-content.right, .service-image.left {
    order: 0;
    transform: none;
  }

  .service-title {
    font-size: 24px;
  }

  .service-description {
    font-size: 14px;
  }
}
</style>