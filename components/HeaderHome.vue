<template>
  <header class="header position-relative vh-100 overflow-hidden">
    <div class="header__background-top"></div>
    <div class="header__background-bottom"></div>
    <div class="container-fluid h-100">
      <div class="row h-100">
        <div class="col-lg-7 d-flex flex-column py-5 position-relative">
          <div class="header__top">
            <h1 class="header__title fw-bold text-primary" v-if="headerData">
              {{ headerData.Title }}
            </h1>
            <p class="header__subtitle text-primary" v-if="headerData">
              {{ headerData.Subtitle }}
            </p>
          </div>
          <div class="header__bottom">
            <h2 class="header__subtitle-large fw-bold text-white" v-if="headerData">
              {{ headerData.Heading }}
            </h2>
            <p class="header__subtitle text-white mb-4" v-if="headerData">
              {{ headerData.Subheading }}
            </p>
            <div class="header__services">
              <div class="row g-2 justify-content-start">
                <div class="col-md-4" v-for="service in services.slice(0, 3)" :key="service.path">
                  <NuxtLink :to="service.path" class="btn btn-outline-light rounded-pill w-100">
                    {{ service.name }}
                  </NuxtLink>
                </div>
              </div>
              <div class="row g-2 mt-2 justify-content-start">
                <div class="col-md-4" v-for="service in services.slice(3)" :key="service.path">
                  <NuxtLink :to="service.path" class="btn btn-outline-light rounded-pill w-100">
                    {{ service.name }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-5 d-flex justify-content-center align-items-center position-relative">
          <div>
            <ContactForm @submit="handleSubmit" />
          </div>
        </div>
      </div>
    </div>
    <svg class="header__scroll-arrow" width="40" height="35" viewBox="0 0 40 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 35L36.5 18.5L33.25 15.25L23.5 25V0H16.5V25L6.75 15.25L3.5 18.5L20 35Z" fill="white"/>
    </svg>
  </header>
</template>

<script setup>
import { useAsyncData, useRoute } from '#app'
import { watch, ref } from 'vue'
import ContactForm from '@/components/ContactForm.vue'

const route = useRoute()

const fetchHeaderData = () => $fetch('/api/header-data')

const headerData = ref(null)

const { data, refresh } = await useAsyncData('headerData', fetchHeaderData, {
  server: true,
  lazy: false,
  watch: false,
})

// Initialize headerData with the fetched data
headerData.value = data.value

// Watch for route changes
watch(
  () => route.path,
  async (newPath) => {
    if (newPath === '/') {
      await refresh()
      // Update headerData with the refreshed data
      headerData.value = data.value
    }
  }
)

// Add this function to refresh the data
const refreshHeaderData = async () => {
  await refresh()
}

// Expose the refresh function to the parent component
defineExpose({ refreshHeaderData })

console.log('Header Data:', headerData.value);

const services = [
  { name: 'Paid Media', path: '/paid-media' },
  { name: 'SEO', path: '/seo' },
  { name: 'Content Creation', path: '/content-creation' },
  { name: 'Website', path: '/website' },
  { name: 'Social Media', path: '/social-media' },
  { name: 'Print Advertising', path: '/print-advertising' }
];

const handleSubmit = (formData) => {
  // Implement form submission logic here
  console.log('Form submitted:', formData);
};
</script>

<style scoped>
.header {
  position: relative;
}

.header__background-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  background-color: var(--bs-white);
}

.header__background-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background-color: var(--bs-primary);
}

.header__top {
  position: absolute;
  top: calc(50% - 210px);
  left: 50px;
  right: 0;
  z-index: 1;
}

.header__bottom {
  position: absolute;
  top: calc(50% + 10px);
  left: 50px;
  right: 0;
  z-index: 1;
}

.header__title {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.header__subtitle {
  font-size: 1.1rem;
  margin-top: 20px;
}

.header__subtitle-large {
  font-size: 3rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.header__services {
  display: flex;
  flex-direction: column;
  margin-top: -20px;
}

.header__services .row {
  max-width: 700px;
}

.header__services .row + .row {
  margin-top: -18px;
}

.header__services .btn {
  border-color: var(--bs-white);
  color: var(--bs-white);
  transition: all 0.3s ease;
  font-size: 0.7rem;
  padding: 0.5rem 1rem;
  white-space: nowrap;
}

.header__services .btn:hover, .header__services .btn:focus {
  background-color: var(--bs-white);
  color: var(--bs-primary);
}

.contact-form-wrapper {
  position: relative;
  z-index: 1;
  width: calc(100% + 150px);
  max-width: 550px;
  margin-top: 50px;
  margin-bottom: -50px;
  margin-left: -50px;
}

.header__scroll-arrow {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 3s infinite;
  z-index: 1;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(-20px);
  }
  60% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@media (max-width: 1200px) {
  .header__top, .header__bottom {
    left: 30px;
  }
}

@media (max-width: 992px) {
  .header__top {
    top: calc(50% - 190px);
  }

  .header__bottom {
    top: calc(50% + 20px);
  }

  .header__title {
    font-size: 2.5rem;
  }

  .header__subtitle-large {
    font-size: 2.5rem;
  }

  .header__subtitle {
    font-size: 1rem;
  }

  .contact-form-wrapper {
    width: 100%;
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .header__top, .header__bottom {
    left: 20px;
  }

  .header__top {
    top: calc(50% - 170px);
  }

  .header__bottom {
    top: calc(50% + 30px);
  }

  .header__title {
    font-size: 2rem;
  }

  .header__subtitle-large {
    font-size: 2rem;
  }

  .header__subtitle {
    font-size: 0.9rem;
  }

  .header__services .btn {
    font-size: 0.6rem;
    padding: 0.4rem 1rem;
  }

  .contact-form-wrapper {
    width: 100%;
    max-width: 400px;
  }
}
</style>