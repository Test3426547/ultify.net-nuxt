<template>
  <section class="hero-consultation bg-light d-flex flex-column">
    <div class="container">
      <h2 class="main-heading text-primary text-center">Our Consultation Guarantees</h2>
      <div class="row justify-content-between">
        <div class="col-lg-5">
          <div class="hero-image">
            <img src="/consultation-01.webp" alt="Consultation Hero Image" />
          </div>
        </div>
        <div class="col-lg-5">
          <div class="info-container bg-white rounded-lg p-5">
            <div class="info-section">
              <h3 class="text-primary">We protect your intellectual property.</h3>
              <p class="text-primary">Our agency will provide NDA's to protect your intellectual property and confidential information.</p>
            </div>
            <div class="info-section">
              <h3 class="text-primary">No maximum time</h3>
              <p class="text-primary">We provide in-depth consultations with no maximum time to ensure you get the information you need.</p>
            </div>
            <div class="info-section">
              <h3 class="text-primary">Certified Consultants</h3>
              <p class="text-primary">Our consultations are managed by real business consultants who have passed our extensive certification checklist.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No setup needed for this component
</script>

<style scoped>
.hero-consultation {
  padding-top: 100px !important;
  padding-bottom: 70px !important; /* Added 100px padding to the bottom */
  margin-top: -50px !important; /* Negative margin to pull content up */
}

.container {
  padding-top: 30px;
  padding-bottom: 30px;
}

.main-heading {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 60px;
}

.hero-image {
  height: 100%;
  margin-left: -50px;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.info-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  margin-right: -50px;
}

.info-section {
  margin-bottom: 30px;
}

.info-section:last-child {
  margin-bottom: 0;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

p {
  font-size: 1rem;
  line-height: 1.4;
}

@media (max-width: 991px) {
  .hero-consultation {
    margin-top: -100px !important; /* Less aggressive on mobile */
    padding-bottom: 50px !important; /* Reduced bottom padding on mobile */
  }

  .hero-image, .info-container {
    height: auto;
    margin-left: 0;
    margin-right: 0;
  }
  
  .hero-image {
    margin-bottom: 30px;
  }
}
</style>