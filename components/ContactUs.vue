<template>
  <section class="consultation">
    <div class="background-image"></div>
    <div class="container-fluid h-100">
      <div class="row h-100 justify-content-end align-items-center">
        <div class="col-lg-6 form-column">
          <div class="form-container">
            <h2>Book A Free<br>Consultation Now</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <input type="text" id="url" v-model="form.url" placeholder="URL/Business Name (if applicable)">
              </div>
              <div class="form-group">
                <input type="text" id="name" v-model="form.name" placeholder="Name">
              </div>
              <div class="form-group">
                <input type="email" id="email" v-model="form.email" placeholder="Email">
              </div>
              <div class="form-group">
                <input type="tel" id="phone" v-model="form.phone" placeholder="Phone">
              </div>
              <button type="submit">LEAD WITHOUT A SWEAT</button>
            </form>
            <p class="disclaimer">
              You are booking a free consultation with no maximum time (TnC's apply).
              We will call you on the given number on our first available time-slot.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Script remains unchanged
</script>

<style scoped>
.consultation {
  position: relative;
  height: calc(100vh - 250px);
  min-height: 550px;
  display: flex;
  align-items: center;
  background-color: #45c5ff;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/running-man.png');
  background-size: cover; /* Changed from 130% to cover */
  background-position: center; /* Adjusted from center 25% to center */
  background-repeat: no-repeat;
}

/* Rest of the styles remain unchanged */

@media (max-width: 991px) {
  .consultation {
    height: auto;
    padding: 80px 0;
  }

  .background-image {
    background-position: center; /* Ensure centered positioning on smaller screens */
  }

  /* Rest of the media query styles remain unchanged */
}
</style>