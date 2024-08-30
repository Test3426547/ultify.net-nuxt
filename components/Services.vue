<template>
  <section>
    <!-- Hero Section with Carousel -->
    <div class="py-5 bg-light position-relative">
      <div class="container">
        <div class="row align-items-center justify-content-center">
          <div class="col-lg-6 text-center">
            <h1 class="display-4 text-primary fw-bold">
              Get a Website Exactly The Way You Need!
            </h1>
            <p class="lead">
              You have high standards. We have the expertise to meet them.
            </p>
          </div>
          <div class="col-lg-6 mt-5 mt-lg-0">
            <div id="featureCarousel" class="carousel slide" data-bs-ride="carousel" data-bs-interval="2000">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="/home-01.png" class="d-block w-100 rounded border-radius-lg shadow" alt="Responsive Website">
                </div>
                <div class="carousel-item">
                  <img src="/home-06.png" class="d-block w-100 rounded border-radius-lg shadow" alt="Website Development">
                </div>
                <div class="carousel-item">
                  <img src="/home-07.png" class="d-block w-100 rounded border-radius-lg shadow" alt="SEO Optimization">
                </div>
                <div class="carousel-item">
                  <img src="/home-08.png" class="d-block w-100 rounded border-radius-lg shadow" alt="Digital Marketing">
                </div>
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#featureCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#featureCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Service Description Section -->
    <div class="py-5 bg-light position-relative">
      <div class="container position-relative z-index-2 text-center text-dark">
        <h1 class="fw-bold mb-3">
          Gain a <span class="text-primary">Lead,</span> Without The <span class="text-primary">Sweat</span>
        </h1>
        <p class="lead">
          We understand that the digital marketing aspect of things is rather complicated, especially while running a business. Our SEO, SEM, and PPC strategies have been proven to work and are constantly aligned with current algorithms. We are so confident, that if we don’t deliver, we’ll refund you. Whether you need leads, a website, content or a professional to help, we are ready and remove the hard work from your path.
        </p>
      </div>
    </div>

    <!-- Service Benefits Section -->
    <div class="py-10 bg-light">
      <div class="container">
        <div class="row text-center align-items-stretch">
          <div class="col-lg-3 col-md-6 mb-5 d-flex">
            <div class="card shadow border-radius-lg p-4 flex-fill">
              <div class="card-body">
                <div class="icon icon-shape icon-md bg-gradient-primary shadow-primary mx-auto mb-3">
                  <i class="ni ni-chart-bar-32 text-white"></i>
                </div>
                <h5 class="text-primary">Guaranteed Leads</h5>
                <p class="text-muted">Our digital marketing agency will help you masterplan and put into action an effective strategy for lead generation.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 d-flex">
            <div class="card shadow border-radius-lg p-4 flex-fill">
              <div class="card-body">
                <div class="icon icon-shape icon-md bg-gradient-primary shadow-primary mx-auto mb-3">
                  <i class="ni ni-delivery-fast text-white"></i>
                </div>
                <h5 class="text-primary">Guaranteed Traffic</h5>
                <p class="text-muted">Drive traffic with our comprehensive digital marketing strategies.</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 d-flex">
            <div class="card shadow border-radius-lg p-4 flex-fill">
              <div class="card-body">
                <div class="icon icon-shape icon-md bg-gradient-primary shadow-primary mx-auto mb-3">
                  <i class="ni ni-world-2 text-white"></i>
                </div>
                <h5 class="text-primary">Guaranteed Rankings</h5>
                <p class="text-muted">Our SEO services are designed to boost your rankings, or you don't pay!</p>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 mb-5 d-flex">
            <div class="card shadow border-radius-lg p-4 flex-fill">
              <div class="card-body">
                <div class="icon icon-shape icon-md bg-gradient-primary shadow-primary mx-auto mb-3">
                  <i class="ni ni-satisfied text-white"></i>
                </div>
                <h5 class="text-primary">Guaranteed Growth</h5>
                <p class="text-muted">Our commitment is to ensure your sustained growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Services',
};
</script>

<style scoped>
/* Styling */
.card {
  backdrop-filter: blur(10px);
  background-color: var(--bs-card-bg);
  transition: background-color 0.3s, color 0.3s;
}
</style>