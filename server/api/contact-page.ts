import { defineEventHandler } from 'h3'
import { useStrapi } from '~/utils/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi()

  try {
    const [headerContact, contact, contactUsMaps, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-contact.header-contact', { populate: '*' }),
      strapi.find('api::contact.contact', { populate: '*' }),
      strapi.find('api::contact-us-maps.contact-us-maps', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { populate: '*' }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    return {
      headerContact: headerContact.data,
      contact: contact.data,
      contactUsMaps: contactUsMaps.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      meta: {
        title: 'Contact Us | Ultify Solutions',
        description: 'Get in touch with Ultify Solutions, your digital marketing partner in Sydney. Reach out for innovative strategies to boost your online presence.',
        ogImage: 'https://ultifysolutions.com/images/contact-us-og.jpg',
        ogUrl: 'https://ultifysolutions.com/contact-us',
        canonicalUrl: 'https://ultifysolutions.com/contact-us',
        robots: 'index, follow'
      },
      contactInfo: {
        telephone: '+61-2-1234-5678',
        email: 'info@ultifysolutions.com',
        streetAddress: '123 Digital Street',
        city: 'Sydney',
        state: 'NSW',
        postalCode: '2000',
        country: 'AU'
      }
    }
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching contact page data'
    })
  }
})