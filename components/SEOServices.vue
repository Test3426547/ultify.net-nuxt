<template>
    <section class="our-services">
      <div class="bg-primary text-white py-5 banner">
        <div class="container">
          <div class="row">
            <div class="col-md-8 mx-auto text-center">
              <h3 class="wave-heading">Our Services</h3>
              <p class="faq-subtitle">Explore our comprehensive range of expert services designed to meet your diverse needs.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="container service-grid">
        <div class="row g-4">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :title="service.title"
            :description="service.description"
            :imgSrc="service.imgSrc"
            :altText="service.altText"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import ServiceCard from './ServiceCard.vue';
  
  export default {
    name: 'OurServices',
    components: {
      ServiceCard,
    },
    data() {
      return {
        services: [
          {
            title: "Technical SEO",
            description: "Optimizing the infrastructure and backend of a website to make it easier for search engines to crawl.",
            imgSrc: "seo-04.png",
            altText: "Technical SEO Service"
          },
          {
            title: "On-Page SEO",
            description: "On-page SEO involves optimizing both the content and HTML source code of a page.",
            imgSrc: "seo-05.png",
            altText: "On-Page SEO Service"
          },
          {
            title: "Off-Page SEO",
            description: "Techniques and strategies used to improve a website's search engine rankings through actions that occur outside the boundaries of the website itself.",
            imgSrc: "seo-06.png",
            altText: "Off-Page SEO Service"
          },
          {
            title: "Keywords",
            description: "Keywords are the foundation of your content strategy, helping search engines understand what your content is about and match it with relevant user queries.",
            imgSrc: "seo-07.png",
            altText: "Keywords Service"
          },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .our-services {
    background-color: var(--bs-light);
  }
  
  .banner {
    padding-top: 110px !important; /* Increased top padding */
    padding-bottom: 110px !important; /* Increased bottom padding */
    margin-bottom: 100px; /* Add space below the banner */
  }
  
  .wave-heading {
    font-size: 3em;
    color: var(--bs-white);
  }
  
  .faq-subtitle {
    font-size: 1.2rem;
  }
  
  .service-grid {
    padding-top: 25px;
    padding-bottom: 100px; /* Increased bottom padding */
  }
  
  .row {
    --bs-gutter-x: 40px; /* Increase horizontal gap between cards */
  }
  
  @media (max-width: 991.98px) {
    .banner {
      padding-top: 50px !important;
      padding-bottom: 50px !important;
    }
  
    .service-grid {
      padding-top: 15px;
      padding-bottom: 50px;
    }
  }
  </style>