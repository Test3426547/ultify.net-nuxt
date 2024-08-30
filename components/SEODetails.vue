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
            title: 'SEO For CMS Websites',
            description: 'Do you need exponentially growing organic traffic to your website so you can stop worrying about getting enough clients? Our digital marketing agency offers guaranteed results driven from our extreme expertise in SEO, combined with a deep understanding of popular CMS platforms; such as WordPress, Shopify and GoDaddy. This allow us to deliver comprehensive SEO services so that whether your CMS website requires a basic SEO set-up, or you desire a top-page search result, we will be willing with a bright-smile to take on your work.',
            image: '/seo-01.png'
          },  
        
          {
            title: 'SEO For Websites Built on Frameworks',
            description: 'At ULTIFY, we deliver guaranteed framework website SEO solutions through our expertise with numerous popular framework languages and their software functions. In addition, our coders have great experience with html, css and java. Whether you need a professional to optimise a framework websites code, implement an internal linking system, all the way to getting a top page search ranking for your framework website’s SEO, get in touch with us now to begin smashing search engine rankings ASAP!',
            image: '/seo-02.png'
          },
          {
            title: 'SEO Audit & Strategy',
            description: 'Through numerous SEO test and analysis, including technical SEO, on-page SEO, off-page SEO and keyword audits, our agency is able to determine exact improvements to be made in order to achieve your desired SEO outcomes. For a business, it is a cheat code to possess great SEO rankings as it will bring a growing flow of organic traffic to your website, especially from individuals that are actively search relevant keywords. At ULTIFY, our team will work on end to figure out exactly what your website is lacking and develop a SEO strategy that wont just bring you to the top, but will keep you there.',
            image: '/seo-03.png'
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