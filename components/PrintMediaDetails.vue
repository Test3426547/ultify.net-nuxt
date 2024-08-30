<template>
  <section class="service-details bg-light">
    <div class="container">
      <div class="service-row" v-for="(service, index) in services" :key="index">
        <div class="service-content" :class="{ 'right': index % 2 !== 0 }">
          <h2 class="service-title text-primary">{{ service.title }}</h2>
          <p class="service-description">{{ service.description }}</p>
        </div>
        <div class="service-image" :class="{ 'left': index % 2 !== 0 }">
          <img :src="service.image" :alt="service.title" :class="{ 'resize-image': index === 0 || index === 2 }">
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
            title: 'Design',
            description: 'Do you need a low-cost yet highly productive and profitable print campaign? At ULTIFY, we achieve this for our clients through our extensive designing capabilities, where we turn paper into endless calls for your business. Whether your business needs flyers, brochures or any print ad, we’ve got you covered so you can reach potential clients outside of the digital realm. ULTIFY has the design service you need for a strong print advertising campaign result which actually grows, scale sand profits.',
            image: '/print-media-01.png'
          },  
        
          {
            title: 'Printing',
            description: 'Our agency offers a large variety of print materials, ranging from paper (standard, cardstock, matte, glossy, textured), plastic (PVC, vinyl, acrylic), metal (aluminum, steel, brass), and magnetic materials. ULTIFY has the material for the situation. Did you know that 1000 flyers start from just 5 dollars? The cost of printing will never be an issue, as one sale will return the investment.',
            image: '/print-media-02.jpg'
          },
          {
            title: 'Delivery',
            description: 'Our delivery team at ULTIFY is able to handle high demands on a cosnsitant basis for all our numerous delivery methods. This inclues all door-door, mailbox-mailbox, courier, signage installation and public hand outs. Our delivery service guarantees a speedy and reliable delivery.',
            image: '/print-media-03.png'
          },
          {
            title: 'Print Advertising Audit & Strategy',
            description: 'Through our agencies print advertising audit & strategy service, we strategise print types, placements (such as storefront signs), targeting approach, audience demographics and delivery methods (handing out flyers at a mall), all while considering your budget and timeline constraints. ULTIFY follows a data-driven approach, analysing profitability and returns in order to ensure scalability, cost effectiveness and efficiency. Let’s start printing.',
            image: '/print-media-04.png'
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

.service-image img.resize-image {
  max-width: 60%;
  display: block;
  margin: 0 auto;
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