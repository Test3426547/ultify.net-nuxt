<template>
  <footer class="footer bg-light text-primary">
    <div class="container">
      <div class="footer-content">
        <div class="company-info">
          <h2 class="text-primary">ULTIFY SOLUTIONS</h2>
          <p class="fw-bold">If you need results, you need Ultify.</p>
          <address class="fw-bold">
            Level 25, 50 Clarent St<br>
            Wynyard, Sydney, NSW, 2000<br>
            Australia
          </address>
          <div class="contact-info">
            <p class="fw-bold"><font-awesome-icon :icon="['fas', 'phone']" class="me-2" /> 1800 ULTIFY</p>
            <p class="fw-bold"><font-awesome-icon :icon="['fas', 'envelope']" class="me-2" /> admin@ultify.net</p>
          </div>
          <div class="social-icons">
            <a href="#" aria-label="Instagram" class="bounce-link"><font-awesome-icon :icon="['fab', 'instagram']" /></a>
            <a href="#" aria-label="Facebook" class="bounce-link"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
            <a href="#" aria-label="LinkedIn" class="bounce-link"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
          </div>
        </div>
        <div class="footer-links">
          <div class="link-column">
            <h3 class="text-primary">Company</h3>
            <ul>
              <li><a href="#" @click.prevent="navigateAndRefresh('/')" class="bounce-link">Home</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/consultation')" class="bounce-link">Consultation</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/about-us')" class="bounce-link">About Us</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/contact-us')" class="bounce-link">Contact Us</a></li>
            </ul>
          </div>
          <div class="link-column">
            <h3 class="text-primary">Services</h3>
            <ul>
              <li><a href="#" @click.prevent="navigateAndRefresh('/website')" class="bounce-link">Website</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/social-media')" class="bounce-link">Social Media</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/seo')" class="bounce-link">SEO</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/paid-media')" class="bounce-link">Paid Media</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/content-creation')" class="bounce-link">Content Creation</a></li>
              <li><a href="#" @click.prevent="navigateAndRefresh('/print-advertising')" class="bounce-link">Print Advertising</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateAndRefresh = async (path) => {
  await router.push(path)
  // After navigation, refresh the header data
  const headerComponent = document.querySelector('header')?.querySelector('script')
  if (headerComponent && 'refreshHeaderData' in headerComponent) {
    await (headerComponent as any).refreshHeaderData()
  }
}
</script>

<style scoped>
.footer {
  padding: 100px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
}

.company-info {
  flex: 0 0 40%;
}

.company-info h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

.company-info p,
.company-info address {
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.contact-info {
  margin-top: 2rem;
}

.contact-info p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.social-icons {
  margin-top: 2rem;
}

.social-icons a {
  font-size: 2.2rem;
  margin-right: 1.5rem;
  color: var(--bs-primary);
}

.footer-links {
  display: flex;
  flex: 0 0 50%;
  justify-content: space-between;
}

.link-column h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.link-column ul {
  list-style-type: none;
  padding: 0;
}

.link-column ul li {
  margin-bottom: 1rem;
}

.link-column ul li a {
  color: var(--bs-primary);
  text-decoration: none;
  font-size: 1.1rem;
}

.bounce-link {
  transition: transform 0.3s;
}

.bounce-link:hover {
  transform: translateY(-5px);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .company-info,
  .footer-links {
    flex: 0 0 100%;
    margin-bottom: 3rem;
  }
}
</style>