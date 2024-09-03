<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Contact Information Section -->
    <div class="bg-ultify-dark-grey text-white p-8 lg:w-1/2 flex flex-col justify-center relative z-10">
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
    <div class="lg:w-1/2 h-screen relative overflow-hidden">
      <div class="absolute inset-0 bg-ultify-dark-grey transform -skew-x-2 origin-top-right"></div>
      <div id="map" class="absolute inset-0 z-10" style="clip-path: polygon(2% 0, 100% 0, 100% 100%, 0 100%);"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';
import { PhoneIcon, EnvelopeIcon } from '@heroicons/vue/24/solid';
import { InstagramIcon, LinkedinIcon, FacebookIcon } from 'lucide-vue-next';

onMounted(async () => {
  const loader = new Loader({
    apiKey: 'AIzaSyDy2sx9yUDMLbZvobyGgR-t_8f48OqXPjE',
    version: 'weekly',
    libraries: ['places']
  });

  const google = await loader.load();
  const map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -33.8688, lng: 151.2093 }, // Sydney coordinates (will be updated)
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
        });

        const streetViewService = new google.maps.StreetViewService();
        streetViewService.getPanorama({ location: place.geometry.location, radius: 50 }, (data, status) => {
          if (status === google.maps.StreetViewStatus.OK) {
            const panorama = new google.maps.StreetViewPanorama(
              document.createElement('div'),
              {
                pano: data.location.pano,
              }
            );
            
            const infowindow = new google.maps.InfoWindow({
              content: `
                <div>
                  <img src="${panorama.getLinks()[0].photoUrl}" alt="Street View" style="width:300px;height:200px;">
                  <p style="margin-top:10px;font-weight:bold;">ULTIFY SOLUTIONS</p>
                  <p>50 Clarent St, Wynyard, Sydney, NSW, 2000, Australia</p>
                </div>
              `,
            });

            infowindow.open(map, marker);

            marker.addListener('click', () => {
              infowindow.open(map, marker);
            });
          }
        });
      }
    }
  );
});
</script>