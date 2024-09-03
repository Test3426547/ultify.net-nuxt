<template>
  <div :class="$style.contactForm" v-if="contactFormData">
    <div :class="$style.contactFormInner">
      <h2 :class="$style.title">
        {{ contactFormData.Title }}
      </h2>
      <div :class="$style.formContainer">
        <form @submit.prevent="handleSubmit">
          <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id" :class="$style.formGroup">
            <input
              :class="$style.formControl"
              v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
              :placeholder="placeholder.Body"
              :type="getInputType(placeholder.Body)"
            />
          </div>
          <button type="submit" :class="$style.submitButton" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : contactFormData.Button }}
          </button>
        </form>
      </div>
      <p :class="$style.formText">
        {{ contactFormData.Description }}
      </p>
      <p v-if="submitSuccess" :class="$style.successMessage">Your enquiry has been submitted successfully!</p>
      <p v-if="submitError" :class="$style.errorMessage">{{ submitError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { useRoute } from 'vue-router'

const route = useRoute()
const dataStore = useDataStore()

const { state } = storeToRefs(dataStore)

const contactFormData = computed(() => state.value.contactFormData)

const form = ref({})
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

watch(() => contactFormData.value, (newData) => {
  if (newData) {
    form.value = newData.Placeholder.reduce((acc, field) => {
      acc[field.Body.toLowerCase().replace(/\s+/g, '-')] = ''
      return acc
    }, {})
  }
}, { immediate: true })

// Initial data fetch
if (!state.value.contactFormData) {
  dataStore.fetchContactFormData()
}

// Watch for route changes
watch(() => route.path, () => {
  if (!state.value.contactFormData) {
    dataStore.fetchContactFormData()
  }
})

const getInputType = (placeholder: string) => {
  if (placeholder.toLowerCase().includes('email')) return 'email'
  if (placeholder.toLowerCase().includes('phone')) return 'tel'
  return 'text'
}

const handleSubmit = async () => {
  isSubmitting.value = true
  submitError.value = null
  submitSuccess.value = false

  try {
    const response = await fetch('/api/submit-enquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: form.value }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const result = await response.json()
    console.log('Form submitted successfully:', result)
    submitSuccess.value = true
    form.value = {}
  } catch (error) {
    console.error('Error submitting form:', error)
    submitError.value = 'An error occurred while submitting the form. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

const refreshContactFormData = async (): Promise<void> => {
  await dataStore.fetchContactFormData()
}

defineExpose({ refreshContactFormData })
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

.successMessage {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #28a745;
  text-align: center;
}

.errorMessage {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #dc3545;
  text-align: center;
}
</style>