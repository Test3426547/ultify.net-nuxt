import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useFetch } from '#app'
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
    serviceSelectorData: null,
    qneData: null,
    consultationData: null,
    mapData: null,
    contactFormData: null,
    serviceDetailsData: null,
    aboutUsDetailsData: null,
    consultationHeroData: null,
    serviceTechnologyLeftData: null,
    serviceTechnologyRightData: null,
    navbarData: null,
    websiteHeaderData: null,
    socialMediaHeaderData: null,
    seoHeaderData: null,
    paidMediaHeaderData: null,
    contentCreationHeaderData: null,
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
      serviceSelector: false,
      qne: false,
      consultation: false,
      map: false,
      contactForm: false,
      serviceDetails: false,
      aboutUsDetails: false,
      consultationHero: false,
      serviceTechnologyLeft: false,
      serviceTechnologyRight: false,
      navbar: false,
      websiteHeader: false,
      socialMediaHeader: false,
      seoHeader: false,
      paidMediaHeader: false,
      contentCreationHeader: false,
    },
  })

  // Getters
  const isAnyLoading = computed(() => Object.values(state.value.loading).some(val => val))

  // Actions
  function setData(key: string, data: any) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} data: ${JSON.stringify(data, null, 2)}`)
    state.value[key] = data
  }

  function setError(err: any) {
    logToFile('pinia-store.log', `[Pinia] Error in data store: ${err}`)
    state.value.error = err instanceof Error ? err.message : String(err)
  }

  function setLoading(key: string, isLoading: boolean) {
    logToFile('pinia-store.log', `[Pinia] Setting ${key} loading state: ${isLoading}`)
    state.value.loading[key] = isLoading
  }

  async function fetchData(key: string, apiEndpoint: string) {
    if (state.value[key]) {
      logToFile('pinia-store.log', `[Pinia] Data for ${key} already exists, skipping fetch`)
      return
    }

    state.value.apiCallCount++
    logToFile('pinia-store.log', `[Pinia] API call count: ${state.value.apiCallCount}`)

    setLoading(key, true)
    try {
      logToFile('pinia-store.log', `[Pinia] Fetching data from ${apiEndpoint}`)
      const { data, error } = await useFetch(apiEndpoint, {
        key: `store-${key}`,
        server: {
          maxAge: 10800 // Cache for 3 hours
        }
      })
      
      if (error.value) {
        throw error.value
      }

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
  const fetchOurDnaData = () => fetchData('ourDnaData', '/api/our-dna-data')
  const fetchServiceSelectorData = () => fetchData('serviceSelectorData', '/api/service-selector-data')
  const fetchQNEData = () => fetchData('qneData', '/api/qne-data')
  const fetchConsultationData = () => fetchData('consultationData', '/api/consultation-data')
  const fetchMapData = () => fetchData('mapData', '/api/map-data')
  const fetchContactFormData = () => fetchData('contactFormData', '/api/contact-form-data')
  const fetchServiceDetailsData = (serviceId: number) => fetchData('serviceDetailsData', `/api/service-details-data?id=${serviceId}`)
  const fetchHeaderServiceData = (serviceId: number) => fetchData('headerServiceData', `/api/header-service-data?id=${serviceId}`)
  const fetchAboutUsDetailsData = () => fetchData('aboutUsDetailsData', '/api/about-us-details-data')
  const fetchConsultationHeroData = () => fetchData('consultationHeroData', '/api/consultation-hero-data')
  const fetchServiceTechnologyLeftData = () => fetchData('serviceTechnologyLeftData', '/api/service-technology-left-data')
  const fetchServiceTechnologyRightData = () => fetchData('serviceTechnologyRightData', '/api/service-technology-right-data')
  const fetchNavbarData = () => fetchData('navbarData', '/api/navbar-data')
  const fetchWebsiteHeaderData = () => fetchData('websiteHeaderData', '/api/website-header-data')
  const fetchSocialMediaHeaderData = () => fetchData('socialMediaHeaderData', '/api/social-media-header-data')
  const fetchSeoHeaderData = () => fetchData('seoHeaderData', '/api/seo-header-data')
  const fetchPaidMediaHeaderData = () => fetchData('paidMediaHeaderData', '/api/paid-media-header-data')
  const fetchContentCreationHeaderData = () => fetchData('contentCreationHeaderData', '/api/content-creation-header-data')
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
    fetchServiceSelectorData,
    fetchQNEData,
    fetchConsultationData,
    fetchMapData,
    fetchContactFormData,
    fetchServiceDetailsData,
    fetchAboutUsDetailsData,
    fetchConsultationHeroData,
    fetchServiceTechnologyLeftData,
    fetchServiceTechnologyRightData,
    fetchNavbarData,
    fetchWebsiteHeaderData,
    fetchSocialMediaHeaderData,
    fetchSeoHeaderData,
    fetchPaidMediaHeaderData,
    fetchContentCreationHeaderData,
  }
})