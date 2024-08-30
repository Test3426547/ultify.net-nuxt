<template>
    <div :class="$style.contactForm">
      <div :class="$style.contactFormInner">
        <h2 :class="$style.title">
          Book A Free Consultation<br>Now
        </h2>
        <div :class="$style.formContainer">
          <form @submit.prevent="handleSubmit">
            <div :class="$style.formGroup">
              <input
                :class="$style.formControl"
                v-model="form.businessName"
                placeholder="URL/Business Name (if applicable)"
                type="text"
              />
            </div>
            <div :class="$style.formGroup">
              <input
                :class="$style.formControl"
                v-model="form.name"
                placeholder="Name"
                type="text"
              />
            </div>
            <div :class="$style.formGroup">
              <input
                :class="$style.formControl"
                v-model="form.email"
                placeholder="Email"
                type="email"
              />
            </div>
            <div :class="$style.formGroup">
              <input
                :class="$style.formControl"
                v-model="form.phone"
                placeholder="Phone"
                type="tel"
              />
            </div>
            <button type="submit" :class="$style.submitButton">
              LEAD WITHOUT A SWEAT
            </button>
          </form>
        </div>
        <p :class="$style.formText">
          You are booking a free consultation with no maximum time (TnC's apply).
          We will call you on the given number on our first available time-slot.
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const form = ref({
    businessName: '',
    name: '',
    email: '',
    phone: ''
  });
  
  const emit = defineEmits(['submit']);
  
  const handleSubmit = () => {
    emit('submit', form.value);
  };
  </script>
  
  <style module>
  .contactForm {
    position: relative;
    z-index: 1;
    width: calc(100% + 70px);
    max-width: 620px;
    background-color: #e9ecef;
    border-radius: 2rem;
    display: flex;
    flex-direction: column;
    height: calc(100%); /* Reduced height by 30px */
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    margin-left: -55px;
    margin-right: -15px;
    margin-top: 30px; /* Added margin-top to move the form down by 30px */
    font-family: 'Poppins', sans-serif;
  }
  
  .contactFormInner {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;
  }
  
  .title {
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 1.5rem;
    color: #212529;
    line-height: 1.2;
  }
  
  .formContainer {
    padding: 0 1rem;
  }
  
  .formGroup {
    margin-bottom: 30px;
  }
  
  .formControl {
    display: block;
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 50px;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }
  
  .formControl:focus {
    color: #212529;
    background-color: #fff;
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(55, 181, 255, 0.25);
  }
  
  .submitButton {
    display: block;
    width: 100%;
    padding: 0.85rem 1.5rem;
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;
    color: #fff;
    background-color: #37b5ff;
    border-color: #37b5ff;
    text-align: center;
    text-decoration: none;
    vertical-align: middle;
    cursor: pointer;
    user-select: none;
    border: 1px solid transparent;
    border-radius: 50px;
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .submitButton:hover {
    color: #fff;
    background-color: #2f9ad9;
    border-color: #2c91cc;
  }
  
  .formText {
    margin-top: 1rem;
    font-size: 0.875rem;
    color: #6c757d;
    text-align: center;
  }
  </style>