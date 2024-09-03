<template>
  <section class="consultation bg-primary">
    <div class="container">
      <div class="row align-items-stretch">
        <!-- Image Section -->
        <div v-if="consultationData" class="col-lg-6 p-0">
          <div class="image-container">
            <img :src="consultationData.Image.data.attributes.url" alt="Consultation Image" class="image">
          </div>
        </div>

        <!-- Form Section -->
        <div class="col-lg-6 p-0">
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
  padding: 0;
}

.container {
  max-width: 100%;
  padding: 0;
}

.row {
  margin: 0;
  display: flex;
}

.col-lg-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.image-container, .form-container {
  height: 100%;
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
  height: 100%;
}

.contact-form-full-size {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  background-color: #f8f9fa;
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
    height: auto;
  }

  .image-container {
    margin-bottom: 0;
  }

  .contact-form-full-size {
    padding: 30px;
  }
}
</style>