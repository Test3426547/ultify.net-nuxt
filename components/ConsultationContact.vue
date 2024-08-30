<template>
  <div class="contact-form-container vh-100 vw-100 d-flex align-items-center justify-content-center bg-white">
    <div class="contact-form bg-primary rounded-5 p-4 p-md-5">
      <h2 class="text-white text-center mb-4">Book A Free Consultation Now</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <input 
            type="text" 
            class="form-control form-control-lg rounded-pill bg-light" 
            id="url" 
            v-model="formData.url"
            placeholder="URL/Business Name (If applicable)"
          >
        </div>
        <div class="mb-3">
          <input 
            type="text" 
            class="form-control form-control-lg rounded-pill bg-light" 
            id="name" 
            v-model="formData.name"
            placeholder="Name" 
            required
          >
        </div>
        <div class="mb-3">
          <input 
            type="email" 
            class="form-control form-control-lg rounded-pill bg-light" 
            id="email" 
            v-model="formData.email"
            placeholder="Email" 
            required
          >
        </div>
        <div class="mb-3">
          <input 
            type="tel" 
            class="form-control form-control-lg rounded-pill bg-light" 
            id="phone" 
            v-model="formData.phone"
            placeholder="Phone" 
            required
          >
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-lg rounded-pill text-white custom-black-btn">
            LEAD WITHOUT A SWEAT
          </button>
        </div>
      </form>
      <p class="text-white text-center mt-4 small">
        You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  url: '',
  name: '',
  email: '',
  phone: ''
})

const submitForm = () => {
  console.log('Form submitted:', formData.value)
  // Add your form submission logic here
}
</script>

<style scoped>
.contact-form-container {
  background-color: var(--bs-white);
}

.contact-form {
  max-width: 650px; /* Reduced from 750px to 650px */
  width: 100%;
  background-color: var(--bs-primary);
  padding: 2rem;
}

.form-control {
  background-color: var(--bs-light);
  padding-right: 1rem !important;
}

.custom-black-btn {
  background-color: #000;
  transition: background-color 0.3s ease;
}

.custom-black-btn:hover {
  background-color: #333;
}

@media (max-width: 768px) {
  .contact-form {
    max-width: calc(90% - 100px); /* Adjusted to account for the 100px reduction */
    padding: 1.5rem;
  }
}
</style>