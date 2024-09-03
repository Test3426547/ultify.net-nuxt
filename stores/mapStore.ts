import { defineStore } from 'pinia'

export const useMapStore = defineStore('map', {
  state: () => ({
    location: [-33.8688, 151.2093] as [number, number], // Sydney coordinates
    zoom: 15,
    address: "Level 25, 50 Clarent St, Wynyard, Sydney, NSW, 2000"
  }),
  actions: {
    setLocation(location: [number, number]) {
      this.location = location
    },
    setZoom(zoom: number) {
      this.zoom = zoom
    }
  }
})