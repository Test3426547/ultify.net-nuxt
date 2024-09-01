<template>
  <footer class="bg-ultify-grey py-8">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-start mb-12">
        <div class="mb-8 md:mb-0 md:w-1/2">
          <h2 class="text-5xl font-black text-ultify-blue mb-4 underline">admin@ultify.net</h2>
          <div class="mt-24">
            <a
              href="#"
              @click.prevent="navigateAndRefresh('/contact')"
              class="inline-block border-2 border-ultify-blue text-ultify-blue font-black py-3 px-8 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300 text-xl"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
        <div class="md:w-1/2 flex flex-col items-end">
          <a href="#" @click.prevent="navigateAndRefresh('/')" class="inline-block mb-8">
            <img src="/ultify.svg" alt="Ultify Logo" class="h-24 w-auto" />
          </a>
          <div class="flex flex-wrap gap-6 justify-end mb-8">
            <a href="#" @click.prevent="navigateAndRefresh('https://facebook.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline text-xl font-bold">Facebook</a>
            <a href="#" @click.prevent="navigateAndRefresh('https://instagram.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline text-xl font-bold">Instagram</a>
            <a href="#" @click.prevent="navigateAndRefresh('https://linkedin.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline text-xl font-bold">LinkedIn</a>
            <a href="#" @click.prevent="navigateAndRefresh('https://twitter.com')" target="_blank" rel="noopener noreferrer" class="text-ultify-blue hover:underline text-xl font-bold">X</a>
          </div>
          <div class="flex flex-wrap justify-end gap-4 mb-8">
            <a href="#" @click.prevent="navigateAndRefresh('/privacy-policy')" class="text-ultify-blue hover:underline">Privacy Policy</a>
            <a href="#" @click.prevent="navigateAndRefresh('/terms-of-use')" class="text-ultify-blue hover:underline">Terms of Use</a>
            <a href="#" @click.prevent="navigateAndRefresh('/contact')" class="text-ultify-blue hover:underline">Contact</a>
            <a href="#" @click.prevent="navigateAndRefresh('/faq')" class="text-ultify-blue hover:underline">FAQ</a>
          </div>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <a href="#" @click.prevent="navigateAndRefresh('/website')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">Website</a>
        <a href="#" @click.prevent="navigateAndRefresh('/social-media')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">Social Media</a>
        <a href="#" @click.prevent="navigateAndRefresh('/content-creation')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">Content Creation</a>
        <a href="#" @click.prevent="navigateAndRefresh('/seo')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">SEO</a>
        <a href="#" @click.prevent="navigateAndRefresh('/paid-media')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">Paid Media</a>
        <a href="#" @click.prevent="navigateAndRefresh('/print-advertising')" class="bg-white text-ultify-blue font-bold py-2 px-6 rounded-full hover:bg-ultify-blue hover:text-white transition duration-300">Print Advertising</a>
      </div>
      <div class="text-center">
        <p class="text-ultify-blue">&copy; 2024 Ultify Solutions</p>
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
  height: 50vh; /* This sets the footer height to half of the viewport height */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>