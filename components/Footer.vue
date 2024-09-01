<template>
  <footer class="bg-ultify-grey py-12">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start mb-8">
        <div class="mb-8 md:mb-0">
          <h2 class="text-4xl font-bold text-ultify-blue mb-4">admin@ultify.net</h2>
          <a
            href="#"
            @click.prevent="navigateAndRefresh('/contact')"
            class="inline-block border-2 border-ultify-blue text-ultify-blue font-semibold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300"
          >
            GET IN TOUCH
          </a>
        </div>
        <div class="flex flex-wrap gap-4">
          <a href="#" @click.prevent="navigateAndRefresh('https://facebook.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline">Facebook</a>
          <a href="#" @click.prevent="navigateAndRefresh('https://instagram.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline">Instagram</a>
          <a href="#" @click.prevent="navigateAndRefresh('https://linkedin.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline">LinkedIn</a>
          <a href="#" @click.prevent="navigateAndRefresh('https://twitter.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline">X</a>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="mb-4 md:mb-0">
          <a href="#" @click.prevent="navigateAndRefresh('/')" class="inline-block">
            <img src="/ultify-logo.svg" alt="Ultify Logo" class="h-12 w-auto" />
          </a>
        </div>
        <nav class="flex flex-wrap justify-center md:justify-end gap-4 mb-4 md:mb-0">
          <a href="#" @click.prevent="navigateAndRefresh('/website')" class="text-ultify-blue hover:underline">Website</a>
          <a href="#" @click.prevent="navigateAndRefresh('/social-media')" class="text-ultify-blue hover:underline">Social Media</a>
          <a href="#" @click.prevent="navigateAndRefresh('/content-creation')" class="text-ultify-blue hover:underline">Content Creation</a>
          <a href="#" @click.prevent="navigateAndRefresh('/seo')" class="text-ultify-blue hover:underline">SEO</a>
          <a href="#" @click.prevent="navigateAndRefresh('/paid-media')" class="text-ultify-blue hover:underline">Paid Media</a>
          <a href="#" @click.prevent="navigateAndRefresh('/print-advertising')" class="text-ultify-blue hover:underline">Print Advertising</a>
        </nav>
      </div>
      <div class="flex flex-col md:flex-row justify-between items-center mt-8">
        <p class="text-ultify-blue mb-4 md:mb-0">&copy; 2024 Ultify Solutions</p>
        <div class="flex flex-wrap justify-center md:justify-end gap-4">
          <a href="#" @click.prevent="navigateAndRefresh('/privacy-policy')" class="text-ultify-blue hover:underline">Privacy Policy</a>
          <a href="#" @click.prevent="navigateAndRefresh('/terms-of-use')" class="text-ultify-blue hover:underline">Terms of Use</a>
          <a href="#" @click.prevent="navigateAndRefresh('/contact')" class="text-ultify-blue hover:underline">Contact</a>
          <a href="#" @click.prevent="navigateAndRefresh('/faq')" class="text-ultify-blue hover:underline">FAQ</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const navigateAndRefresh = (path) => {
  // Implement your navigation and refresh logic here
  console.log(`Navigating to: ${path}`);
}
</script>

<style scoped>
footer {
  min-height: 50vh; /* This sets the footer height to half of the viewport height, which is approximately half an A4 page in horizontal orientation */
}
</style>