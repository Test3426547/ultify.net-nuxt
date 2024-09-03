import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useAsyncData } from '#app'

export const useDataStore = defineStore('data', () => {
  // State
  const footerData = ref(null)
  const faqData = ref(null)
  const ctaData = ref(null)
  const carouselData = ref(null)
  const headerHomeData = ref(null)
  const headerServiceData = ref(null)
  const ourDNAData = ref(null)
  const ourServicesData = ref(null)
  const quickNEasyData = ref(null)
  const serviceSelectorData = ref(null)
  const error = ref(null)
  const loading = ref({
    footer: false,
    faq: false,
    cta: false,
    carousel: false,
    headerHome: false,
    headerService: false,
    ourDNA: false,
    ourServices: false,
    quickNEasy: false,
    serviceSelector: false,
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(loading.value).some(val => val))

  // Actions
  function setData(key, data) {
    console.log(`Setting ${key} data:`, data)
    this[key] = data
  }

  function setError(err) {
    console.error('Error in data store:', err)
    error.value = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key, isLoading) {
    console.log(`Setting ${key} loading state:`, isLoading)
    loading.value[key] = isLoading
  }

  async function fetchData(key, apiEndpoint) {
    setLoading(key, true)
    try {
      const { data } = await useAsyncData(key, () => $fetch(apiEndpoint))
      if (data.value) {
        setData(key, data.value)
        console.log(`${key} data fetched successfully`)
      } else {
        throw new Error(`No data returned for ${key}`)
      }
    } catch (err) {
      setError(err)
      console.error(`Error fetching ${key} data:`, err)
    } finally {
      setLoading(key, false)
    }
  }

  // Specific fetch functions for each component
  const fetchFooterData = () => fetchData('footerData', '/api/footer-data')
  const fetchFAQData = () => fetchData('faqData', '/api/faq-data')
  const fetchCTAData = () => fetchData('ctaData', '/api/cta-data')
  const fetchCarouselData = () => fetchData('carouselData', '/api/carousel-data')
  const fetchHeaderHomeData = () => fetchData('headerHomeData', '/api/header-home-data')
  const fetchHeaderServiceData = () => fetchData('headerServiceData', '/api/header-service-data')
  const fetchOurDNAData = () => fetchData('ourDNAData', '/api/our-dna-data')
  const fetchOurServicesData = () => fetchData('ourServicesData', '/api/our-services-data')
  const fetchQuickNEasyData = () => fetchData('quickNEasyData', '/api/quick-n-easy-data')
  const fetchServiceSelectorData = () => fetchData('serviceSelectorData', '/api/service-selector-data')

  return {
    // State
    footerData,
    faqData,
    ctaData,
    carouselData,
    headerHomeData,
    headerServiceData,
    ourDNAData,
    ourServicesData,
    quickNEasyData,
    serviceSelectorData,
    error,
    loading,
    // Getters
    isAnyLoading,
    // Actions
    setData,
    setError,
    setLoading,
    fetchData,
    fetchFooterData,
    fetchFAQData,
    fetchCTAData,
    fetchCarouselData,
    fetchHeaderHomeData,
    fetchHeaderServiceData,
    fetchOurDNAData,
    fetchOurServicesData,
    fetchQuickNEasyData,
    fetchServiceSelectorData,
  }
})