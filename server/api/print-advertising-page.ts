import { defineEventHandler } from 'h3'
import { useStrapi4 } from '@nuxtjs/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerService, printAdvertisingBlog, printMediaDetails, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'print-advertising' } },
        populate: '*' 
      }),
      strapi.find('api::print-advertising-blog.print-advertising-blog', { populate: '*' }),
      strapi.find('api::print-media-details.print-media-details', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'print-advertising' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'Print Advertising'
    const serviceSlug = 'print-advertising'

    return {
      headerService: headerService.data,
      printAdvertisingBlog: printAdvertisingBlog.data,
      printMediaDetails: printMediaDetails.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 6, // Print Advertising service ID
      metaTitle: `${serviceName} Services | Ultify Solutions`,
      metaDescription: 'Elevate your brand with Ultify Solutions\' expert print advertising services. Create impactful print campaigns that resonate with your target audience.',
      ogImage: `https://ultifysolutions.com/images/${serviceSlug}-og.jpg`,
      ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      robots: 'index, follow',
      title: `${serviceName} Services`,
      description: 'Comprehensive print advertising services to elevate your brand and create impactful campaigns. We offer creative design, strategic placement, and measurable results for all types of print media.',
      serviceName: `${serviceName} Services`,
      serviceDescription: 'Comprehensive print advertising services to elevate your brand and create impactful campaigns. We offer creative design, strategic placement, and measurable results for all types of print media.',
      serviceType: serviceName,
      offers: [
        { name: 'Newspaper Advertising' },
        { name: 'Magazine Advertising' },
        { name: 'Brochure Design' },
        { name: 'Poster Design' },
        { name: 'Direct Mail Campaigns' }
      ],
      hasOfferCatalog: {
        name: 'Print Advertising Services',
        itemListElement: [
          {
            name: 'Print Advertising Techniques',
            itemListElement: [
              { name: 'Creative Design' },
              { name: 'Copywriting' },
              { name: 'Media Planning and Buying' },
              { name: 'Print Production Management' },
              { name: 'Campaign Performance Analysis' }
            ]
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching print advertising page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching print advertising page data'
    })
  }
})