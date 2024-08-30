<template>
    <section class="quick-n-easy bg-bs-primary text-bs-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <!-- Left column with text content -->
          <div class="col-lg-6">
            <h2 class="mb-4 fw-bold">Get started, Quick 'n' Easy</h2>
            
            <!-- Numbered list -->
            <div class="numbered-list">
              <div class="list-item d-flex mb-3" v-for="(item, index) in steps" :key="index">
                <div class="number me-3">{{ index + 1 }}</div>
                <p>{{ item }}</p>
              </div>
            </div>
            
            <!-- Consult Now button -->
            <nuxt-link to="/consultation" class="btn bg-bs-white text-bs-primary rounded-pill px-4 py-2 mt-3">
              CONSULT NOW
            </nuxt-link>
          </div>
          
          <!-- Right column with image -->
          <div class="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-end">
            <img src="/quickneasy.svg" alt="Quick and Easy Process" class="img-fluid quick-easy-image">
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { onMounted, nextTick } from 'vue'

  // In the setup function
  onMounted(() => {
    nextTick(() => {
      emit('loaded')
    })
})

  const steps = [
    "Reach out to us and utilise our free consultation system. We will collaboratively discuss with you about your project requirements, spending, goals and more!",
    "Our team will create a effective strategy that aligns with your discussed requirements and offer you an effective solution.",
    "Our team will get to work straight away, informing you of updates on a daily basis. In any service offering, we will provide test and drafts to ensure the most effective results are achieved."
  ];
  </script>
  
  <style scoped>
  .quick-n-easy {
    background-color: var(--bs-primary);
    color: var(--bs-white);
  }
  
  .number {
    width: 30px;
    height: 30px;
    border: 2px solid var(--bs-white);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-weight: bold;
  }
  
  .list-item p {
    margin-bottom: 0;
    font-size: 0.9rem;
  }
  
  .btn {
    font-weight: bold;
  }
  
  .quick-easy-image {
    max-width: 80%;
    margin-left: auto;
  }
  
  @media (max-width: 991.98px) {
    .quick-n-easy h2 {
      font-size: 1.75rem;
    }
    
    .list-item {
      font-size: 0.9rem;
    }
  
    .quick-easy-image {
      max-width: 100%;
      margin-top: 2rem;
    }
  }
  </style>