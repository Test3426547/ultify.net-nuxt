<template>
  <nav class="navbar fixed-top">
    <div class="container-fluid">
      <NuxtLink to="/" class="navbar-brand">
        <img src="/ultify.svg" alt="Ultify Logo" height="75" width="auto">
      </NuxtLink>
      <button class="navbar-toggler" type="button" @click="toggleMenu" aria-label="Toggle navigation">
        <div class="hamburger-circle">
          <div class="hamburger">
            <span></span>
            <span></span>
          </div>
        </div>
      </button>
    </div>
  </nav>

  <div class="offcanvas" :class="{ 'show': isMenuOpen }" ref="offcanvas">
    <button class="navbar-toggler offcanvas-toggler" type="button" @click="toggleMenu" aria-label="Close navigation">
      <div class="hamburger-circle">
        <div class="close-icon">
          <span></span>
          <span></span>
        </div>
      </div>
    </button>
    <div class="offcanvas-body flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <ul class="nav-list">
          <li><a href="#" @click.prevent="navigateAndRefresh('/')">Home</a></li>
          <li class="services-dropdown">
            <a href="#" @click.prevent="toggleServices">Services <span class="arrow" :class="{ 'up': showServices }">&#9662;</span></a>
            <ul v-if="showServices" class="services-submenu">
              <li><a href="#" @click.prevent="navigateAndRefresh('/website')">Website</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/social-media')">Social Media</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/seo')">SEO</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/paid-media')">Paid Media</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/content-creation')">Content Creation</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/print-advertising')">Print Advertising</a></li>
            </ul>
          </li>
          <li><a href="#" @click.prevent="navigateAndRefresh('/about-us')">About Us</a></li>
          <li><a href="#" @click.prevent="navigateAndRefresh('/consultation')">Consultation</a></li>
          <li><a href="#" @click.prevent="navigateAndRefresh('/contact-us')">Contact Us</a></li>
        </ul>
      </div>
      <div class="md:w-1/2 flex items-center justify-center">
        <div class="w-full max-w-md">
          <h2 class="text-2xl font-bold text-white mb-4">Get in touch.</h2>
          <form @submit.prevent="submitForm" class="space-y-4">
            <input 
              v-model="form.name" 
              type="text" 
              placeholder="Name" 
              class="w-full px-4 py-2 rounded-full bg-white text-ultify-blue placeholder-ultify-blue"
            >
            <input 
              v-model="form.email" 
              type="email" 
              placeholder="Email" 
              class="w-full px-4 py-2 rounded-full bg-white text-ultify-blue placeholder-ultify-blue"
            >
            <input 
              v-model="form.website" 
              type="text" 
              placeholder="Enter your company website" 
              class="w-full px-4 py-2 rounded-full bg-white text-ultify-blue placeholder-ultify-blue"
            >
            <textarea 
              v-model="form.message" 
              placeholder="Message" 
              rows="4" 
              class="w-full px-4 py-2 rounded-2xl bg-white text-ultify-blue placeholder-ultify-blue"
            ></textarea>
            <button 
              type="submit" 
              class="w-full px-4 py-2 rounded-full bg-white text-ultify-blue font-bold hover:bg-ultify-blue hover:text-white transition-colors duration-300"
            >
              Here Back From Us Now
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const isMenuOpen = ref(false)
const showServices = ref(false)
const router = useRouter()
const offcanvas = ref(null)

const form = ref({
  name: '',
  email: '',
  website: '',
  message: ''
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (!isMenuOpen.value) {
    showServices.value = false
  }
}

const toggleServices = () => {
  showServices.value = !showServices.value
}

const navigateAndRefresh = async (path) => {
  toggleMenu()
  await router.push(path)
  // After navigation, refresh the header data
  const headerComponent = document.querySelector('header')?.querySelector('script')
  if (headerComponent && 'refreshHeaderData' in headerComponent) {
    await (headerComponent as any).refreshHeaderData()
  }
}

const submitForm = () => {
  // Implement form submission logic here
  console.log('Form submitted:', form.value)
  // Reset form after submission
  form.value = { name: '', email: '', website: '', message: '' }
}

onMounted(() => {
  const menuItems = (offcanvas.value as HTMLElement | null)?.querySelectorAll('[ref="menuItem"]')
  if (menuItems) {
    menuItems.forEach((item: Element) => {
      const menuItem = item as HTMLElement;
      gsap.to(menuItem, {
        y: 10,
        opacity: 0,
        duration: 0.2,
        paused: true,
        ease: 'power2.inOut',
      });
      menuItem.animation = gsap.to(menuItem, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        paused: true,
        ease: 'power2.out',
      });
      
      menuItem.addEventListener('mouseenter', () => menuItem.animation.play());
      menuItem.addEventListener('mouseleave', () => menuItem.animation.reverse());
    });
  }
});

router.afterEach(() => {
  isMenuOpen.value = false
  showServices.value = false
})
</script>

<style scoped>
/* Existing Bootstrap styles */
.navbar {
  padding: 0.5rem 1rem;
  background-color: transparent !important;
  box-shadow: none !important;
}

.navbar-brand img {
  max-height: 75px;
  width: auto;
}

.navbar-toggler {
  border: none;
  padding: 0;
  background: transparent;
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 1060;
}

.navbar-toggler:focus {
  box-shadow: none;
}

.hamburger-circle {
  width: 40px;
  height: 40px;
  border: 2px solid #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hamburger {
  width: 20px;
  height: 10px;
  position: relative;
  cursor: pointer;
}

.hamburger span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #000;
  left: 0;
}

.hamburger span:nth-child(1) { top: 0; }
.hamburger span:nth-child(2) { bottom: 0; }

.close-icon {
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;
}

.close-icon span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: #000;
  left: 0;
  top: 50%;
}

.close-icon span:nth-child(1) { transform: rotate(45deg); }
.close-icon span:nth-child(2) { transform: rotate(-45deg); }

.offcanvas {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bs-primary);
  transform: translateX(100%);
  transition: transform 0.3s ease-in-out;
  z-index: 1050;
  display: flex;
  flex-direction: column;
  padding-top: 60px;
}

.offcanvas.show {
  transform: translateX(0);
}

.offcanvas-toggler {
  position: absolute;
}

.offcanvas-toggler .hamburger-circle {
  border-color: #000;
}

.offcanvas-toggler .close-icon span {
  background: #000;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  text-align: left;
}

.nav-list li {
  margin-bottom: 2rem;
}

.nav-list a {
  color: #fff;
  font-size: 3rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.3s ease;
}

.nav-list a:hover {
  color: rgba(255, 255, 255, 0.8);
}

.services-dropdown {
  position: relative;
}

.arrow {
  display: inline-block;
  transition: transform 0.3s ease;
}

.arrow.up {
  transform: rotate(180deg);
}

.services-submenu {
  list-style-type: none;
  padding-left: 0;
  margin-top: 1rem;
}

.services-submenu li {
  margin-bottom: 1rem;
}

.services-submenu a {
  font-size: 2rem;
}

@media (min-width: 768px) {
  .nav-list a {
    font-size: 4rem;
  }
  
  .services-submenu a {
    font-size: 2.5rem;
  }
}
</style>