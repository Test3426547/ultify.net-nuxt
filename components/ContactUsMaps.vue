<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Contact Information Section -->
    <div class="bg-ultify-dark-grey text-white p-8 lg:w-1/3 flex flex-col justify-center relative z-10">
      <div class="max-w-lg mx-auto">
        <h2 class="text-4xl font-bold mb-4 text-white">ULTIFY SOLUTIONS</h2>
        <p class="text-xl font-semibold mb-8">If you need results, you need Ultify.</p>
        
        <div class="mb-8">
          <p class="font-bold mb-2">Level 25, 50 Clarent St</p>
          <p class="font-bold mb-2">Wynyard, Sydney, NSW, 2000</p>
          <p class="font-bold">Australia</p>
        </div>
        
        <div class="flex space-x-4 mb-12">
          <a href="#" aria-label="Instagram" class="text-white hover:text-gray-300 transition-colors duration-300">
            <InstagramIcon class="w-8 h-8" />
          </a>
          <a href="#" aria-label="LinkedIn" class="text-white hover:text-gray-300 transition-colors duration-300">
            <LinkedinIcon class="w-8 h-8" />
          </a>
          <a href="#" aria-label="Facebook" class="text-white hover:text-gray-300 transition-colors duration-300">
            <FacebookIcon class="w-8 h-8" />
          </a>
        </div>
        
        <!-- Search Input - moved down -->
        <div class="search-container mt-12">
          <div class="mb-4">
            <input
              ref="searchInput"
              type="text"
              placeholder="Search for an address"
              class="w-full p-2 text-black"
              :value="defaultAddress"
            />
          </div>
          <button @click="searchLocation" class="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
        </div>
      </div>
    </div>

    <!-- Map Section -->
    <div class="lg:w-2/3 h-screen relative overflow-hidden">
      <div class="absolute inset-0 bg-ultify-dark-grey transform -skew-x-[30deg] origin-top-left"></div>
      <div id="map" class="absolute inset-0 z-10" style="clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%);"></div>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { ref, onMounted } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { Loader } from '@googlemaps/js-api-loader';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next';

const config = useRuntimeConfig()

const defaultAddress = ref("Level 25, 50 Clarent St, Wynyard, Sydney, NSW, 2000, Australia");
const searchInput = ref(null);
let map, autocomplete, marker, infowindow;

const { data: mapData } = await useAsyncData('mapData', async () => {
  const loader = new Loader({
    apiKey: config.public.googleMapsApiKey,
    version: 'weekly',
    libraries: ['places']
  });

  return await loader.load();
});

function searchLocation() {
  const address = searchInput.value.value || defaultAddress.value;
  const geocoder = new mapData.value.maps.Geocoder();
  
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === 'OK' && results[0]) {
      map.setCenter(results[0].geometry.location);
      setMarker(results[0]);
    }
  });
}

function setMarker(place) {
  if (marker) marker.setMap(null);
  
  marker = new mapData.value.maps.Marker({
    map: map,
    position: place.geometry.location,
    icon: {
      path: mapData.value.maps.SymbolPath.CIRCLE,
      scale: 10,
      fillColor: "#4285F4",
      fillOpacity: 1,
      strokeColor: "#FFFFFF",
      strokeWeight: 2,
    },
  });

  if (infowindow) infowindow.close();
  
  infowindow = new mapData.value.maps.InfoWindow({
    content: `
      <div>
        <p style="font-weight:bold;">ULTIFY SOLUTIONS</p>
        <p>${place.formatted_address}</p>
      </div>
    `,
  });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });
}

onMounted(() => {
  if (mapData.value) {
    const mapElement = document.getElementById('map');
    map = new mapData.value.maps.Map(mapElement, {
      center: { lat: -33.8688, lng: 151.2093 },
      zoom: 15,
      styles: [
        {
          featureType: 'all',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#ffffff' }]
        },
        {
          featureType: 'all',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#000000' }, { lightness: 13 }]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#000000' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.fill',
          stylers: [{ color: '#000000' }]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#144b53' }, { lightness: 14 }, { weight: 1.4 }]
        },
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{ color: '#08304b' }]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{ color: '#0c4152' }, { lightness: 5 }]
        },
      ]
    });

    autocomplete = new mapData.value.maps.places.Autocomplete(searchInput.value, {
      types: ['geocode']
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        map.setCenter(place.geometry.location);
        setMarker(place);
      }
    });

    // Initial search for Ultify office
    searchLocation();
  }
});
</script>

<style scoped>
.search-container {
  margin-top: 50px; /* This will move the search bar and button down by 50px */
}

/* Add any component-specific styles here */
</style>