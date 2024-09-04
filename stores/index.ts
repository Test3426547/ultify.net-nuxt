import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAsyncData } from 'nuxt/app'
import { logToFile } from '../utils/logger'

export const useDataStore = defineStore('data', () => {
  const state = ref({
    faqData: null,
    footerData: null,
    ctaData: null,
    digitalWorldData: null,
    carouselData: null,
    headerData: null,
    headerServiceData: null,
    ourDnaData: null,
    ourServicesData: null,
    qneData: null,
    consultationData: null,
    mapData: null,
    contactFormData: null,
    error: null,
    loading: {
      faq: false,
      footer: false,
      cta: false,
      digitalWorld: false,
      carousel: false,
      header: false,
      headerService: false,
      ourDna: false,
      ourServices: false,
      qne: false,
      consultation: false,
      map: false,
      contactForm: false,
    },
    apiCallCount: 0,
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(state.value.loading).some(val => val))

  // Actions
  function setData(key, data) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} data: ${JSON.stringify(data, null, 2)}`)
    state.value[key] = data
  }

  function setError(err) {
    logToFile('pinia-store.log', `[Pinia] Error in data store: ${err}`)
    state.value.error = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key, isLoading) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} loading state: ${isLoading}`)
    state.value.loading[key] = isLoading
  }

  async function fetchData(key, apiEndpoint) {
    if (state.value[key]) {
      logToFile('pinia-store.log', `[Pinia] Data for ${key} already exists, skipping fetch`)
      return
    }

    state.value.apiCallCount++
    logToFile('pinia-store.log', `[Pinia] API call count: ${state.value.apiCallCount}`)

    setLoading(key, true)
    try {
      logToFile('pinia-store.log', `[Pinia] Fetching data from ${apiEndpoint}`)
      const { data } = await useAsyncData(key, () => $fetch(apiEndpoint))
      logToFile('pinia-store.log', `[Pinia] Raw data received: ${JSON.stringify(data.value, null, 2)}`)
      if (data.value) {
        setData(key, data.value)
        logToFile('pinia-store.log', `[Pinia] ${key} data fetched successfully: ${JSON.stringify(data.value, null, 2)}`)
      } else {
        logToFile('pinia-store.log', `[Pinia] No data returned for ${key}`)
        setData(key, null)
      }
    } catch (err) {
      setError(err)
      logToFile('pinia-store.log', `[Pinia] Error fetching ${key} data: ${err.message}\n${err.stack}`)
    } finally {
      setLoading(key, false)
    }
  }

  // Specific fetch functions for each component
  const fetchFAQData = () => fetchData('faqData', '/api/faq-data')
  const fetchFooterData = () => fetchData('footerData', '/api/footer-data')
  const fetchCTAData = () => fetchData('ctaData', '/api/cta-data')
  const fetchDigitalWorldData = () => fetchData('digitalWorldData', '/api/digital-world-data')
  const fetchCarouselData = () => fetchData('carouselData', '/api/carousel-data')
  const fetchHeaderData = () => fetchData('headerData', '/api/header-data')
  const fetchHeaderServiceData = (serviceId: number) => fetchData('headerServiceData', `/api/header-service-data?id=${serviceId}`)
  const fetchOurDnaData = () => fetchData('ourDnaData', '/api/our-dna-data')
  const fetchOurServicesData = () => fetchData('ourServicesData', '/api/our-services-data')
  const fetchQNEData = () => fetchData('qneData', '/api/qne-data')
  const fetchConsultationData = () => fetchData('consultationData', '/api/consultation-data')
  const fetchMapData = () => fetchData('mapData', '/api/map-data')
  const fetchContactFormData = () => fetchData('contactFormData', '/api/contact-form-data')
  return {
    state,
    isAnyLoading,
    setData,
    setError,
    setLoading,
    fetchData,
    fetchFAQData,
    fetchFooterData,
    fetchCTAData,
    fetchDigitalWorldData,
    fetchCarouselData,
    fetchHeaderData,
    fetchHeaderServiceData,
    fetchOurDnaData,
    fetchOurServicesData,
    fetchQNEData,
    fetchConsultationData,
    fetchMapData,
    fetchContactFormData,
  }
})