<template>
  <div class="directive-wrapper">
    <div class="container">
      <div class="directive-box rounded-lg shadow-lg p-4 p-md-5">
        <div class="row align-items-center">
          <div class="col-md-4 mb-4 mb-md-0">
            <div class="directive-title-wrapper">
              <h2 class="directive-title bg-primary text-white rounded-pill py-2 px-4 d-inline-block">
                Directive message from ULTIFY
              </h2>
            </div>
          </div>
          <div class="col-md-8">
            <div class="directive-message-wrapper">
              <p class="directive-message text-dark mb-0">
                "Throughout our years in the industry, we have solidified the ins and outs of all digital marketing elements. At ULTIFY, our agency truly understands consumer demands and we always actively remodel our systems to meet such criteria. As a result, we offer our free consultations for the best interest of connecting with like-minded individuals with whom we have built strong connections over the course of their digital journey. We can't wait to hear from you and excel your innovative ideas through digital marketing with our agency."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directive',
};
</script>

<style scoped>
.directive-wrapper {
  position: relative;
  z-index: 10;
  padding: 50px 0;
}

.directive-wrapper::before,
.directive-wrapper::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 50%;
  z-index: -1;
}

.directive-wrapper::before {
  top: 0;
  background-color: var(--bs-white); /* Changed from var(--bs-primary) to var(--bs-white) */
}

.directive-wrapper::after {
  bottom: 0;
  background-color: var(--bs-light);
}

.directive-box {
  background-color: var(--bs-white);
  border-radius: 20px;
}

.directive-title-wrapper {
  text-align: left;
}

.directive-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.directive-message {
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 767px) {
  .directive-wrapper {
    padding: 30px 0;
  }
  
  .directive-title {
    font-size: 1rem;
  }

  .directive-message {
    font-size: 0.9rem;
  }
}
</style>