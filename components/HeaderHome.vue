<template>
  <div class="relative z-10 w-[calc(100%+70px)] max-w-[620px] bg-ultify-grey rounded-[2rem] flex flex-col h-[calc(100%-30px)] shadow-lg -ml-[55px] -mr-[15px] mt-[30px] font-poppins" v-if="contactFormData">
    <div class="flex-grow flex flex-col justify-between p-8">
      <h2 class="text-[2.5rem] font-semibold text-center mb-6 text-ultify-dark-grey leading-tight">
        {{ contactFormData.Title }}
      </h2>
      <div class="px-4">
        <form @submit.prevent="handleSubmit">
          <div v-for="placeholder in contactFormData.Placeholder" :key="placeholder.id" class="mb-[30px]">
            <input
              class="block w-full py-4 px-6 text-base font-normal leading-6 text-ultify-dark-grey bg-white border border-gray-300 rounded-[50px] transition ease-in-out m-0 focus:text-ultify-dark-grey focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
              v-model="form[placeholder.Body.toLowerCase().replace(/\s+/g, '-')]"
              :placeholder="placeholder.Body"
              :type="getInputType(placeholder.Body)"
            />
          </div>
          <button 
            type="submit" 
            class="block w-full py-[0.85rem] px-6 text-base font-bold leading-6 text-white bg-emerald-500 border border-transparent rounded-[50px] transition duration-150 ease-in-out cursor-pointer select-none hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-5 mb-5"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Submitting...' : contactFormData.Button }}
          </button>
        </form>
      </div>
      <p class="mt-4 text-sm text-gray-600 text-center">
        {{ contactFormData.Description }}
      </p>
      <p v-if="submitSuccess" class="mt-4 text-sm text-green-600 text-center">Your enquiry has been submitted successfully!</p>
      <p v-if="submitError" class="mt-4 text-sm text-red-600 text-center">{{ submitError }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useDataStore } from '~/stores'
import { computed } from 'vue'
import ContactForm from '@/components/ContactForm.vue'

const dataStore = useDataStore()
const { state } = storeToRefs(dataStore)

const headerData = computed(() => state.value.headerData)
const error = computed(() => state.value.error)

// Fetch header data
await dataStore.fetchHeaderData()

interface FormData {
  // Define the structure of your form data here
  [key: string]: any;
}

const handleSubmit = (formData: FormData): void => {
  // Implement form submission logic here
  console.log('Form submitted:', formData);
};
</script>

<style scoped>

</style>