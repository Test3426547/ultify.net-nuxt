<template>
  <div class="about-us bg-primary text-white py-5">
    <div class="container">
      <div class="row align-items-center">
        <!-- Left side: Text content (unchanged) -->
        <div class="col-lg-6 mb-4 mb-lg-0">
          <small>Our DNA</small>
          <h2 class="display-4 mb-4">What ULTIFY is made of</h2>
          <p class="lead mb-4">
            At ULTIFY, our digital marketing agency is highly passionate about bringing success to like-minded individuals and business owners through our traditional and digital marketing efforts. With a team of experienced leaders, professionals, and enthusiasts, we are proud to have a deep understanding of the ever-evolving digital landscape.
          </p>
          <router-link to="/consultation" class="btn btn-light btn-lg">
            Contact Us
          </router-link>
        </div>
        
        <!-- Right side: DNA helix illustration -->
        <div class="col-lg-6">
          <svg viewBox="0 0 300 600" class="dna-helix">
            <path d="M75,0 C150,50 150,100 225,150 C300,200 300,250 225,300 C150,350 150,400 225,450 C300,500 300,550 225,600" fill="none" stroke="white" stroke-width="2" />
            <path d="M225,0 C150,50 150,100 75,150 C0,200 0,250 75,300 C150,350 150,400 75,450 C0,500 0,550 75,600" fill="none" stroke="white" stroke-width="2" />
            <g v-for="(value, index) in companyValues" :key="index">
              <line :x1="100" :y1="75 * index + 37.5" :x2="200" :y2="75 * index + 37.5" stroke="white" stroke-width="1" />
              <text :x="150" :y="75 * index + 33" text-anchor="middle" fill="white" font-size="12">{{ value }}</text>
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutUs',
  data() {
    return {
      companyValues: [
        'Transparency', 'Communication', 'Initiative', 'Creativity',
        'Process-Driven', 'Goal-Oriented', 'Efficient', 'Effective'
      ]
    }
  }
}
</script>

<style scoped>
.dna-helix {
  width: 100%;
  height: auto;
  max-height: 600px;
}

@media (max-width: 991.98px) {
  .dna-helix {
    max-height: 400px;
  }
}
</style>
