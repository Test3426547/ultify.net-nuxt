<script setup lang="ts">
import { useHead } from '#imports'
import Navbar from '@/components/Navbar.vue'

// Define default SEO metadata
const defaultMeta = {
  title: 'Ultify Solutions',
  description: 'Ultify Solutions - Digital Marketing Made Easy. Boost your online presence with our expert services.',
  image: 'https://www.ultifysolutions.com/og-image.jpg',
  url: 'https://www.ultifysolutions.com',
}

// Dynamic SEO setup
const updateSEO = (meta = {}) => {
  useHead({
    title: meta.title || defaultMeta.title,
    titleTemplate: (titleChunk) => {
      return titleChunk ? `${titleChunk} | ${defaultMeta.title}` : defaultMeta.title
    },
    meta: [
      { name: 'description', content: meta.description || defaultMeta.description },
      { property: 'og:title', content: meta.title || defaultMeta.title },
      { property: 'og:description', content: meta.description || defaultMeta.description },
      { property: 'og:image', content: meta.image || defaultMeta.image },
      { property: 'og:url', content: meta.url || defaultMeta.url },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@ultifysolutions' },
      { name: 'twitter:title', content: meta.title || defaultMeta.title },
      { name: 'twitter:description', content: meta.description || defaultMeta.description },
      { name: 'twitter:image', content: meta.image || defaultMeta.image },
    ],
    link: [
      { rel: 'canonical', href: meta.url || defaultMeta.url },
    ],
  })
}

// Call updateSEO with default values
updateSEO()

// Expose updateSEO function to be used in child components
defineExpose({ updateSEO })
</script>

<template>
  <div>
    <Navbar />
    <main>
      <slot />
      <ClientOnly>
        <div v-if="$pwa?.needRefresh" class="pwa-toast" role="alert" aria-labelledby="toast-message">
          <div class="message">
            <span id="toast-message">New content available, click on reload button to update</span>
          </div>
          <div class="buttons">
            <button @click="$pwa.updateServiceWorker()">Reload</button>
            <button @click="$pwa.cancelPrompt()">Close</button>
          </div>
        </div>
      </ClientOnly>
    </main>

  </div>
</template>

<style scoped>
/* Import Poppins font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Base styles */
* {
  font-family: 'Poppins';
}

/* Rest of your styles remain the same */
html, body {
  background-color: var(--bs-light-bg);
  color: var(--bs-body-color);
}

/* PWA Toast Styles */
.pwa-toast {
  background-color: var(--bs-toast-bg);
  border: 1px solid var(--bs-toast-border);
}

.pwa-toast button {
  border: 1px solid var(--bs-toast-border);
}

/* General styles */
html {
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

/* Navbar Styles */
.navbar {
  background-color: var(--bs-navbar-bg) !important;
  box-shadow: var(--bs-navbar-shadow);
  border: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}
</style>