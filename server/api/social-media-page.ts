import { defineEventHandler } from 'h3'
import { useStrapi4 } from '@nuxtjs/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerService, socialMediaBlog, socialMediaDetails, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'social-media-marketing' } },
        populate: '*' 
      }),
      strapi.find('api::social-media-blog.social-media-blog', { populate: '*' }),
      strapi.find('api::social-media-details.social-media-details', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'social-media-marketing' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'Social Media Marketing'
    const serviceSlug = 'social-media-marketing'

    return {
      headerService: headerService.data,
      socialMediaBlog: socialMediaBlog.data,
      socialMediaDetails: socialMediaDetails.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 2, // Social Media Marketing service ID
      metaTitle: `${serviceName} Services | Ultify Solutions`,
      metaDescription: 'Boost your brand\'s online presence with Ultify Solutions\' expert social media marketing services. Engage your audience and drive growth across all major platforms.',
      ogImage: `https://ultifysolutions.com/images/${serviceSlug}-og.jpg`,
      ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      robots: 'index, follow',
      title: `${serviceName} Services`,
      description: 'Comprehensive social media marketing services to boost your brand\'s online presence, engage your target audience, and drive business growth across all major social media platforms.',
      serviceName: `${serviceName} Services`,
      serviceDescription: 'Comprehensive social media marketing services to boost your brand\'s online presence, engage your target audience, and drive business growth across all major social media platforms.',
      serviceType: 'Social Media Marketing',
      offers: [
        { name: 'Facebook Marketing' },
        { name: 'Instagram Marketing' },
        { name: 'LinkedIn Marketing' },
        { name: 'Twitter Marketing' },
        { name: 'TikTok Marketing' }
      ],
      hasOfferCatalog: {
        name: 'Social Media Marketing Services',
        itemListElement: [
          {
            name: 'Service Types',
            itemListElement: [
              { name: 'Social Media Strategy Development' },
              { name: 'Content Creation and Curation' },
              { name: 'Community Management' },
              { name: 'Social Media Advertising' },
              { name: 'Social Media Analytics and Reporting' }
            ]
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching Social Media Marketing page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching Social Media Marketing page data'
    })
  }
})