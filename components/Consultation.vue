<template>
  <section class="consultation bg-primary">
    <div class="container">
      <div class="row align-items-stretch">
        <!-- Image Section -->
        <div v-if="consultationData" class="col-lg-6 d-flex">
          <div class="image-container">
            <img :src="consultationData.Image.data.attributes.url" alt="Consultation Image" class="image">
          </div>
        </div>

        <!-- Form Section -->
        <div class="col-lg-6 d-flex">
          <div class="form-container bg-light rounded-lg shadow-lg">
            <ContactForm />
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
  padding: 40px;
}

/* Adjust ContactForm size within this component */
.form-container :deep(.contact-form-container) {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
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