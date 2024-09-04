import { defineEventHandler } from 'h3'
import { useStrapi4 } from '@nuxtjs/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerData, qneData, carouselData, servicesData, digitalWorldData, faqData, ctaData] = await Promise.all([
      strapi.find('api::header-home.header-home', { populate: '*' }),
      strapi.find('api::quick-and-easy.quick-and-easy', { populate: '*' }),
      strapi.find('api::carousel.carousel', { populate: '*' }),
      strapi.find('api::service.service', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { populate: '*' }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    return {
      headerData: headerData.data,
      qneData: qneData.data,
      carouselData: carouselData.data,
      servicesData: servicesData.data,
      digitalWorldData: digitalWorldData.data,
      faqData: faqData.data,
      ctaData: ctaData.data,
      meta: {
        title: 'Home | Ultify Solutions',
        description: 'Ultify Solutions is a leading digital marketing agency offering innovative strategies to boost your online presence.',
        ogImage: 'https://ultifysolutions.com/images/home-og.jpg',
        ogUrl: 'https://ultifysolutions.com',
        canonicalUrl: 'https://ultifysolutions.com',
        robots: 'index, follow'
      }
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching home page data'
    })
  }
})