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
        
        <div class="mb-8">
          <p class="flex items-center mb-2">
            <PhoneIcon class="w-5 h-5 mr-2" />
            <span>1800 ULTIFY</span>
          </p>
          <p class="flex items-center">
            <EnvelopeIcon class="w-5 h-5 mr-2" />
            <span>admin@ultify.net</span>
          </p>
        </div>
        
        <div class="flex space-x-4">
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
import { useAsyncData } from 'nuxt/app';
import { Loader } from '@googlemaps/js-api-loader';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next';

const { data: mapData } = await useAsyncData('mapData', async () => {
  const loader = new Loader({
    apiKey: 'AIzaSyDy2sx9yUDMLbZvobyGgR-t_8f48OqXPjE',
    version: 'weekly',
    libraries: ['places']
  });

  const google = await loader.load();

  // Create a dummy element for the map
  const mapDiv = document.createElement('div');
  const map = new google.maps.Map(mapDiv, {
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

  const service = new google.maps.places.PlacesService(map);
  
  return new Promise((resolve) => {
    service.findPlaceFromQuery(
      {
        query: "50 Clarent St, Wynyard, Sydney, NSW, 2000, Australia",
        fields: ['name', 'geometry'],
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const place = results[0];
          map.setCenter(place.geometry.location);
          
          const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            },
          });

          const infowindow = new google.maps.InfoWindow({
            content: `
              <div>
                <p style="font-weight:bold;">ULTIFY SOLUTIONS</p>
                <p>50 Clarent St, Wynyard, Sydney, NSW, 2000, Australia</p>
              </div>
            `,
          });

          marker.addListener('click', () => {
            infowindow.open(map, marker);
          });
        }
        resolve({ google, map, place: results[0] });
      }
    );
  });
});

onMounted(() => {
  if (mapData.value) {
    const { google, map } = mapData.value;
    const mapElement = document.getElementById('map');
    if (mapElement) {
      map.setOptions({ center: mapData.value.place.geometry.location });
      map.setTarget(mapElement);
    }
  }
});
</script>

<style scoped>
/* Add any component-specific styles here */
</style>