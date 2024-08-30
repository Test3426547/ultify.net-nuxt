<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100 bg-primary text-white shadow-3d" @click="navigateToService">
      <div class="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 class="card-title font-weight-bold text-white">{{ title }}</h5>
          <p class="card-text">{{ description }}</p>
        </div>
        <img class="card-image mt-3" :src="imgSrc" :alt="altText">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceCard',
  props: {
    title: String,
    description: String,
    imgSrc: String,
    altText: String,
  },
  methods: {
    navigateToService() {
      // Implement navigation logic here
      console.log(`Navigating to ${this.title} service page`);
    }
  }
};
</script>

<style scoped>
.card {
  border-radius: 1.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: var(--bs-primary, #007bff);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
}

.card-body {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  flex-grow: 1;
  font-size: 0.9rem;
  line-height: 1.5;
}

.card-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-top: auto;
  align-self: flex-end;
}

@media (max-width: 767.98px) {
  .card-body {
    padding: 1.25rem;
  }

  .card-title {
    font-size: 1.1rem;
  }

  .card-text {
    font-size: 0.85rem;
  }

  .card-image {
    width: 50px;
    height: 50px;
  }
}
</style>