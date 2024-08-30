<template>
  <section class="consultation bg-primary">
    <div class="container">
      <div class="row align-items-stretch">
        <!-- Image Section -->
        <div class="col-lg-6 d-flex">
          <div class="image-container">
            <img src="/home-15.webp" alt="Consultation Image" class="image">
          </div>
        </div>

        <!-- Form Section -->
        <div class="col-lg-6 d-flex">
          <div class="form-container bg-light rounded-lg shadow-lg">
            <h2 class="text-center">Book A Free Consultation Now</h2>
            <form class="p-4" id="contact-form" @submit.prevent="handleSubmit">
              <div class="form-group">
                <input class="form-control business-name-input" id="businessName" v-model="form.businessName" placeholder="URL/Business Name (if applicable)" type="text" />
              </div>
              <div class="form-group">
                <input class="form-control" id="name" v-model="form.name" placeholder="Name" type="text" />
              </div>
              <div class="form-group">
                <input class="form-control" id="email" v-model="form.email" placeholder="Email" type="email" />
              </div>
              <div class="form-group">
                <input class="form-control" id="phone" v-model="form.phone" placeholder="Phone" type="tel" />
              </div>
              <button type="submit" class="btn btn-primary btn-block">
                LEAD WITHOUT A SWEAT
              </button>
            </form>
            <p class="disclaimer text-dark">
              You are booking a free consultation with no maximum time (TnC's apply). We will call you on the given number on our first available time-slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, nextTick } from 'vue'

// In the setup function
onMounted(() => {
  nextTick(() => {
    emit('loaded')
  })
})

export default {
  name: 'Consultation',
  data() {
    return {
      form: {
        businessName: '',
        name: '',
        email: '',
        phone: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      // Implement form submission logic here
      console.log('Form submitted:', this.form);
    },
  },
};
</script>

<style scoped>
.consultation {
  padding: 120px 0;
}

.row {
  margin: 0 -15px;
}

.col-lg-6 {
  padding: 0 15px;
}

.image-container, .form-container {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  overflow: hidden;
}

.image-container {
  display: flex;
  align-items: stretch;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 50px;
}

h2 {
  margin-bottom: 30px;
  color: var(--bs-dark);
}

.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-control {
  width: 100%;
  padding: 15px 25px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 50px;
  outline: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.business-name-input {
  width: 50%;
}

.form-control:focus {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(var(--bs-primary-rgb), 0.25);
}

.btn-block {
  display: block;
  width: 100%;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50px;
  border: none;
  background-color: var(--bs-primary);
  color: white;
  transition: background-color 0.3s ease;
}

.btn-block:hover {
  background-color: var(--bs-primary-dark, #0056b3);
}

.disclaimer {
  margin-top: 20px;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 991px) {
  .consultation {
    padding: 60px 0;
  }

  .row {
    flex-direction: column;
  }

  .col-lg-6 {
    margin-bottom: 30px;
  }

  .image-container, .form-container {
    height: auto;
  }

  .image-container {
    margin-bottom: 30px;
  }

  .form-container {
    padding: 30px;
  }
}
</style>