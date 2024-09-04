import { defineEventHandler } from 'h3'
import { useStrapi } from '~/utils/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi()

  try {
    const [headerConsultation, heroConsultation, consultationContact, directive, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-consultation.header-consultation', { populate: '*' }),
      strapi.find('api::hero-consultation.hero-consultation', { populate: '*' }),
      strapi.find('api::consultation-contact.consultation-contact', { populate: '*' }),
      strapi.find('api::directive.directive', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { populate: '*' }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    return {
      headerConsultation: headerConsultation.data,
      heroConsultation: heroConsultation.data,
      consultationContact: consultationContact.data,
      directive: directive.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      meta: {
        title: 'Free Consultation | Ultify Solutions',
        description: 'Book a free consultation with Ultify Solutions. Get expert advice on digital marketing strategies tailored to boost your online presence.',
        ogImage: 'https://ultifysolutions.com/images/consultation-og.jpg',
        ogUrl: 'https://ultifysolutions.com/consultation',
        canonicalUrl: 'https://ultifysolutions.com/consultation',
        robots: 'index, follow'
      },
      schema: {
        serviceName: 'Free Digital Marketing Consultation',
        serviceDescription: 'Expert advice on digital marketing strategies tailored to boost your online presence.',
        serviceType: 'Digital Marketing Consultation'
      }
    }
  } catch (error) {
    console.error('Error fetching consultation page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching consultation page data'
    })
  }
})