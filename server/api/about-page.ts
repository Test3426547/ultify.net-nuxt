import { defineEventHandler } from 'h3'
import { useStrapi4 } from '@nuxtjs/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerAboutUs, ourDNA, aboutUsDetails, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-about-us.header-about-us', { populate: '*' }),
      strapi.find('api::our-dna.our-dna', { populate: '*' }),
      strapi.find('api::about-us-details.about-us-details', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { populate: '*' }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    return {
      headerAboutUs: headerAboutUs.data,
      ourDNA: ourDNA.data,
      aboutUsDetails: aboutUsDetails.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      meta: {
        title: 'About Us | Ultify Solutions',
        description: 'Learn about Ultify Solutions, a leading digital marketing agency in Sydney. Discover our mission, values, and the team behind our innovative strategies.',
        ogImage: 'https://ultifysolutions.com/images/about-us-og.jpg',
        ogUrl: 'https://ultifysolutions.com/about-us',
        canonicalUrl: 'https://ultifysolutions.com/about-us',
        robots: 'index, follow'
      }
    }
  } catch (error) {
    console.error('Error fetching about page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching about page data'
    })
  }
})