<template>
    <section class="py-5 pb-6 bg-primary text-white website-technology">
      <div class="container">
        <div class="row align-items-center">
          <!-- Framework Technology Section -->
          <div class="col-md-6 mb-md-0 mb-4">
            <h3 class="mb-0">Our Framework Technology</h3>
            <p>Our technology stack includes a range of popular frameworks to ensure robust and scalable solutions. We have the expertise to work beyond these listed technologies, offering tailored solutions for your needs.</p>
            <ul class="list-unstyled">
              <li><span class="me-2">&#9679;</span> Framework SEO</li>
              <li><span class="me-2">&#9679;</span> React SEO</li>
              <li><span class="me-2">&#9679;</span> Angular JS SEO</li>
              <li><span class="me-2">&#9679;</span> Ruby SEO</li>
              <li><span class="me-2">&#9679;</span> Django SEO</li>
              <li><span class="me-2">&#9679;</span> NodeJS SEO</li>
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
            <h3 class="mb-0">Our CMS Technology</h3>
            <p>We specialize in various CMS platforms to deliver efficient content management solutions. Our expertise is not limited to these technologies, and we can work with other CMS platforms as well.</p>
            <ul class="list-unstyled">
              <li><span class="me-2">&#9679;</span> CMS SEO</li>
              <li><span class="me-2">&#9679;</span> Shopify SEO</li>
              <li><span class="me-2">&#9679;</span> WordPress SEO</li>
              <li><span class="me-2">&#9679;</span> GoDaddy SEO</li>
              <li><span class="me-2">&#9679;</span> Wix SEO</li>
              <li><span class="me-2">&#9679;</span> Weebly SEO</li>
              <li><span class="me-2">&#9679;</span> Squarespace SEO</li>
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