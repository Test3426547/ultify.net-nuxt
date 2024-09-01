<template>
  <div class="col-lg-4 col-md-6 mb-4">
    <div class="card h-100 bg-primary text-white shadow" @click="navigateToService">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title fw-bold">{{ title }}</h5>
        <p class="card-text flex-grow-1">{{ description }}</p>
        <img class="card-image align-self-end" :src="imgSrc" :alt="altText">
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgSrc: {
    type: String,
    required: true
  },
  altText: {
    type: String,
    required: true
  },
  id: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['navigate'])

const navigateToService = () => {
  emit('navigate', props.id)
  console.log(`Navigating to ${props.title} service page`)
}
</script>

<style scoped>
.card {
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.card-body {
  padding: 1.5rem;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.card-text {
  font-size: 0.9rem;
  line-height: 1.5;
}

.card-image {
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-top: 1rem;
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