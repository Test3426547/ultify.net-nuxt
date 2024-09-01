<template>
  <footer class="bg-ultify-grey text-black h-[450px] flex flex-col">
    <div class="flex-grow"></div>
    
    <div class="h-1/5 relative">
      <img src="/ultify.svg" class="absolute right-4 top-1/2 transform -translate-y-1/2" alt="Ultify Logo">
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <h2 class="text-2xl font-bold">admin@ultify.net</h2>
      <ul class="flex space-x-4">
        <li><a href="#" @click.prevent="navigateAndRefresh('/facebook')" class="hover:underline">Facebook</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/instagram')" class="hover:underline">Instagram</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/linkedin')" class="hover:underline">LinkedIn</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/x')" class="hover:underline">X</a></li>
      </ul>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <li><a href="#" @click.prevent="navigateAndRefresh('/contact')" class="border border-black rounded-full px-6 py-2 hover:bg-black hover:text-white transition duration-300">GET IN TOUCH</a></li>
      <ul class="flex space-x-4">
        <li><a href="#" @click.prevent="navigateAndRefresh('/privacy-policy')" class="hover:underline">Privacy Policy</a></li>
        <li><span>|</span></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/terms-of-use')" class="hover:underline">Terms of Use</a></li>
        <li><span>|</span></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/contact')" class="hover:underline">Contact</a></li>
        <li><span>|</span></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/faq')" class="hover:underline">FAQ</a></li>
      </ul>
    </div>
    
    <div class="h-1/5 flex items-center justify-between px-4">
      <span>© 2024 Ultify Solutions</span>
      <ul class="flex space-x-2">
        <li><a href="#" @click.prevent="navigateAndRefresh('/website')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">Website</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/social-media')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">Social Media</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/content-creation')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">Content Creation</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/seo')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">SEO</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/paid-media')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">Paid Media</a></li>
        <li><a href="#" @click.prevent="navigateAndRefresh('/print-advertising')" class="border border-black rounded-full px-4 py-1 hover:bg-black hover:text-white transition duration-300">Print Advertising</a></li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
const navigateAndRefresh = (route) => {
  // Implement your navigation logic here
  console.log(`Navigating to ${route}`);
}
</script>

<style scoped>
/* Any additional styles can be added here if needed */
</style>