<template>
    <section class="py-5 pb-6 bg-primary text-white website-technology">
      <div class="container">
        <div class="row align-items-center">
          <!-- Framework Technology Section -->
          <div class="col-md-6 mb-md-0 mb-4">
            <h3 class="mb-0">Our Social Media Platforms</h3>
            <p>Our social media platforms include the most popular and widely used platforms on the market. We have the expertise to work beyond these listed technologies, offering tailored solutions for your needs.</p>
            <ul class="list-unstyled">
              <li><span class="me-2">&#9679;</span> Facebook Ads</li>
              <li><span class="me-2">&#9679;</span> TikTok Ads</li>
              <li><span class="me-2">&#9679;</span> YouTube Ads</li>
              <li><span class="me-2">&#9679;</span> LinkedIn Ads</li>
              <li><span class="me-2">&#9679;</span> Twitter Ads</li>
              <li><span class="me-2">&#9679;</span> Instagram Ads</li>
            </ul>
          </div>
          <div class="col-md-6">
            <div class="blur-shadow-image text-center">
              <picture>
                <source srcset="/website-02m.png" media="(max-width: 767px)">
                <source srcset="/website-02.png">
                <img src="/website-02.png" alt="Framework Technologies" class="img-fluid shadow border-radius-lg max-height-600">
              </picture>
            </div>
          </div>
        </div>
        <hr class="horizontal light my-6 mx-7">
        <div class="row align-items-center">
          <!-- CMS Technology Section -->
          <div class="col-md-6 mb-md-0 mb-4">
            <h3 class="mb-0">Our Search Engine Platforms</h3>
            <p>We specialize in various Search Engine Platforms to provide an effective marketing strategy. Our expertise is not limited to these technologies, and we can work with other CMS platforms as well.</p>
            <ul class="list-unstyled">
              <li><span class="me-2">&#9679;</span> Google Paid Search</li>
              <li><span class="me-2">&#9679;</span> Bing Search</li>
              <li><span class="me-2">&#9679;</span> Yahoo Search</li>
              <li><span class="me-2">&#9679;</span> Baidu Search</li>
            </ul>
          </div>
          <div class="col-md-6">
            <div class="blur-shadow-image text-center">
              <picture>
                <source srcset="/website-03m.png" media="(max-width: 767px)">
                <source srcset="/website-03.png">
                <img src="/website-03.png" alt="CMS Technologies" class="img-fluid shadow border-radius-lg max-height-600">
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'WebsiteTechnology',
  };
  </script>
  
  <style scoped>
  .website-technology {
    background-color: var(--bs-primary) !important;
    color: var(--bs-white) !important;
  }
  
  .website-technology h3 {
    color: var(--bs-white) !important;
  }
  
  .blur-shadow-image img {
    max-width: 100%;
    height: auto;
    border-radius: var(--bs-border-radius-lg, 0.5rem);
  }
  
  .horizontal.light {
    border-color: var(--bs-white) !important;
    opacity: 0.2;
  }
  
  .pb-6 {
    padding-bottom: 80px !important;
  }
  </style>