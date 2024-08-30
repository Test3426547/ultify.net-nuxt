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
            title: 'Paid Search (SEM)',
            description: 'What if you could instantly advertise to people that are actively searching for your products or services? Well, you can. This opens up huge marketing potential for your business, especially if you need results quickly and you cannot wait for organic methods. Our digital marketing agency specialises in creating highly effective paid search (SEM) strategies that not only attract the clients you need, but also converts them into sales through directed pay-per-click (PPC), cost-per-action (CPA), cost-per-mille (CPM) and other advertising campaign models which we utilise to provide our clients with endless traffic. Stop missing out and start investing in successful paid search campaigns today with ULTIFY.',
            image: '/paid-media-03.png'
          },  
        
          {
            title: 'Social Media Advertising (SMA)',
            description: 'Did you know, 5 billion people use social media? Well, you probably would off guessed a number like that. Then, can you guess my next point? Why are you not advertising on a cost-efficient, globalised marketing platform that brings you exactly the clients you need with an agency that knows exactly what they are doing? At ULTIFY, we don’t guess, we implement our working social media advertising (SMA) strategies into your business, so you can get exactly what you need, whether it is sales, views, download, clicks, likes or all of the above! Let your social media platforms grow your business, increasing your reach on a cost-effective basis.',
            image: '/paid-media-04.png'
          },
          {
            title: 'Retargeting',
            description: 'Statistics show that retargeted users are 8x cheaper to reach per click, while also boosting conversions by up to 400%. At ULTIFY, our agency constantly works on improving paid media campaigns through retargeting by reducing ad spend, converting missed sales, enhancing personalisation, precise targeting and harnessing a great competitive advantage.',
            image: '/paid-media-05.png'
          },
          {
            title: 'Paid Media Audit & Strategy',
            description: 'It is crucial to successfully deliver an engaging, converting and positively rated paid media campaign to not waste resources, damage brand image, waste opportunities and increase bidding cost due to negative ratings from platforms (such as google). Our paid media audit & strategy maximises ROI through implementing a system that is backed by a data-driven approach, which will sufficiently minimise cost, target the right audience, deliver high quality ad creatives and focus on retargeting.',
            image: '/paid-media-06.png'
          },
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
  max-width: 60%;  /* Changed from 100% to 50% */
  height: auto;
  border-radius: 10px;
  display: block;  /* Added to center the image */
  margin: 0 auto;  /* Added to center the image */
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