<template>
  <section class="consultation bg-primary">
    <div class="container">
      <div class="row align-items-stretch">
        <!-- Image Section -->
        <div v-if="consultationData" class="col-lg-6">
          <div class="image-container">
            <img :src="consultationData.Image.data.attributes.url" alt="Consultation Image" class="image">
          </div>
        </div>

        <!-- Form Section -->
        <div class="col-lg-6">
          <div class="form-container">
            <ContactForm class="contact-form-full-size" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'
import ContactForm from './ContactForm.vue'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const consultationData = computed(() => state.value.consultationData)

// Fetch data only if it doesn't exist
if (!state.value.consultationData) {
  dataStore.fetchConsultationData()
}

// Watch for route changes
watch(() => route.path, () => {
  if (!state.value.consultationData) {
    dataStore.fetchConsultationData()
  }
})

const refreshConsultationData = async (): Promise<void> => {
  await dataStore.fetchConsultationData()
}

defineExpose({ refreshConsultationData })
</script>

<style scoped>
.consultation {
  padding: 60px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.row {
  display: flex;
  margin: 0 -15px;
}

.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
  padding: 0 15px;
}

.image-container, .form-container {
  height: 0;
  padding-bottom: 100%; /* This creates a 1:1 aspect ratio */
  position: relative;
  overflow: hidden;
}

.image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  background-color: #f8f9fa;
}

.contact-form-full-size {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
}

/* Force ContactForm to take full height */
.contact-form-full-size :deep(.contact-form-container) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (max-width: 991px) {
  .row {
    flex-direction: column;
  }

  .col-lg-6 {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .image-container, .form-container {
    padding-bottom: 75%; /* Adjust aspect ratio for mobile */
  }

  .contact-form-full-size {
    padding: 30px;
  }
}
</style>