<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Contact Information Section -->
    <div class="bg-ultify-dark-grey text-white p-6 sm:p-8 lg:w-1/3 flex flex-col justify-center relative z-10">
      <div class="max-w-lg mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-white">ULTIFY SOLUTIONS</h2>
        <p class="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">If you need results, you need Ultify.</p>
        
        <div class="mb-6 sm:mb-8">
          <p class="font-bold mb-2 text-sm sm:text-base">{{ mapStore.address }}</p>
        </div>
        
        <div class="mb-6 sm:mb-8">
          <p class="flex items-center mb-2">
            <PhoneIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span class="text-sm sm:text-base">1800 ULTIFY</span>
          </p>
          <p class="flex items-center">
            <EnvelopeIcon class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            <span class="text-sm sm:text-base">admin@ultify.net</span>
          </p>
        </div>
        
        <div class="flex space-x-4">
          <a href="#" aria-label="Instagram" class="text-white hover:text-gray-300 transition-colors duration-300">
            <InstagramIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="LinkedIn" class="text-white hover:text-gray-300 transition-colors duration-300">
            <LinkedinIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
          <a href="#" aria-label="Facebook" class="text-white hover:text-gray-300 transition-colors duration-300">
            <FacebookIcon class="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="lg:w-2/3 h-[50vh] lg:h-screen relative overflow-hidden">
      <div class="absolute inset-0 bg-ultify-dark-grey transform -skew-x-[30deg] origin-top-left"></div>
      <ClientOnly>
        <div id="map" class="absolute inset-0 z-10" style="clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);"></div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next';
import { useMapStore } from '@/stores/mapStore';

const mapStore = useMapStore();

const { data } = await useAsyncData('mapData', async () => {
  return {
    location: mapStore.location,
    zoom: mapStore.zoom,
    address: mapStore.address
  };
});

let map: any = null;

onMounted(() => {
  if (process.client) {
    import('leaflet').then((L) => {
      map = L.map('map', {
        scrollWheelZoom: false,
        zoomControl: false
      }).setView(mapStore.location, mapStore.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: '/pwa-64x64.png',
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      L.marker(mapStore.location, { icon: customIcon }).addTo(map)
        .bindPopup(`<strong>ULTIFY SOLUTIONS</strong><br>${mapStore.address}`)
        .openPopup();

      // Apply custom styles to the map
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        mapContainer.style.filter = 'invert(90%) hue-rotate(180deg)';
      }

      // Adjust map on window resize
      const resizeMap = () => {
        map.invalidateSize();
      };
      window.addEventListener('resize', resizeMap);
    });
  }
});

onUnmounted(() => {
  if (map) {
    map.remove();
  }
  window.removeEventListener('resize', resizeMap);
});
</script>

<style>
@import 'leaflet/dist/leaflet.css';

.leaflet-tile-pane {
  filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
}

.leaflet-marker-icon,
.leaflet-marker-shadow,
.leaflet-popup-content-wrapper,
.leaflet-popup-tip {
  filter: invert(100%) hue-rotate(180deg);
}

@media (max-width: 1023px) {
  .lg\:w-1\/3,
  .lg\:w-2\/3 {
    width: 100%;
  }
}
</style>