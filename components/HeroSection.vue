<template>
  <section class="hero-section position-relative">
    <div class="container h-100">
      <!-- Empty container to maintain space -->
    </div>
  </section>
</template>

<script setup>
// No script needed
</script>

<style scoped>
.hero-section {
  min-height: calc(100vh - 30px);
  background-color: var(--bs-primary);
}

.container {
  height: calc(100vh - 30px);
}

/* Mobile styles */
@media (max-width: 768px) {
  .hero-section {
    min-height: calc(100vh - 20px);
  }

  .container {
    height: calc(100vh - 20px);
  }
}
</style>