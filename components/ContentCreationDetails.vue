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
            title: 'Raw Content Creation',
            description: 'Do you remember that one ad? The one that had all your attention, making you feel a strong case of FOMO unless you gained possession of what was being endorsed? That is what we call successful creative marketing. Let us at ULTIFY take care of all your raw content creation needs so we can capture the essence of that unforgettable ad and leave a long lasting impression on your audience. In saying this, our agency utilises a strong skill-set of camerawork alongside a professional set of cameras to ensure you a top quality project, meeting your high standards.',
            image: '/content-creation-01.jpg'
          },  
        
          {
            title: 'White-Label Content',
            description: 'Lacking the time, budget or need for raw content creation? Well, luckily our agency has the access to an endless array of white-label content without commercial restrictions (we’ve paid so you don’t). At ULTIFY, our team will take the time to sift through a large option of choices, handpicking and putting together a quality piece of content that not only attracts your audience’s focus but also converts them into sales.',
            image: '/content-creation-02.png'
          },
          {
            title: 'Video Editing',
            description: 'In this ech-driven marketing space, video editing has fundamentally existed as a leading application which allows sellers to create compelling and engaging content for their audiences. Video editing tools and techniques have revolutionised the way businesses can promote their products and services through implementing visual effects to increase the quality of content or refined it in a specificcaly alligned way.',
            image: '/content-creation-03.png'
          },
          {
            title: 'Content Creation Audit & Strategy',
            description: 'At our digital marketing agency, we provide a comprehensive content creation audit and strategy service that has you covered from video planning to audience targeting. Whether you have an existing campaigns or are starting from scratch, we ensure delivering content that resonates with your audiences that also drives your desired outcomes.',
            image: '/content-creation-04.png'
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