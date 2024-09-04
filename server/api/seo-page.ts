import { defineEventHandler } from 'h3'
import { useStrapi4 } from '#strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerService, seoTechnology, seoDetails, seoServices, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'seo' } },
        populate: '*' 
      }),
      strapi.find('api::seo-technology.seo-technology', { populate: '*' }),
      strapi.find('api::seo-details.seo-details', { populate: '*' }),
      strapi.find('api::seo-services.seo-services', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'seo' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'SEO'
    const serviceSlug = 'seo'

    return {
      headerService: headerService.data,
      seoTechnology: seoTechnology.data,
      seoDetails: seoDetails.data,
      seoServices: seoServices.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 3, // SEO service ID
      metaTitle: `${serviceName} Services | Ultify Solutions`,
      metaDescription: 'Boost your website\'s visibility with Ultify Solutions\' expert SEO services. Improve rankings, increase organic traffic, and dominate search results.',
      ogImage: `https://ultifysolutions.com/images/${serviceSlug}-services-og.jpg`,
      ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      robots: 'index, follow',
      title: `${serviceName} Services`,
      description: 'Comprehensive SEO services to improve your website\'s visibility in search engines, increase organic traffic, and boost your online presence. We use cutting-edge techniques and tools to deliver measurable results.',
      serviceName: `${serviceName} Services`,
      serviceDescription: 'Comprehensive SEO services to improve your website\'s visibility in search engines, increase organic traffic, and boost your online presence. We use cutting-edge techniques and tools to deliver measurable results.',
      serviceType: 'Search Engine Optimization',
      offers: [
        { name: 'On-Page SEO' },
        { name: 'Off-Page SEO' },
        { name: 'Technical SEO' },
        { name: 'Local SEO' },
        { name: 'E-commerce SEO' }
      ],
      hasOfferCatalog: {
        name: 'SEO Services',
        itemListElement: [
          {
            name: 'SEO Techniques',
            itemListElement: [
              { name: 'Keyword Research and Strategy' },
              { name: 'Content Optimization' },
              { name: 'Link Building' },
              { name: 'Site Speed Optimization' },
              { name: 'SEO Audits and Reporting' }
            ]
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching SEO page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching SEO page data'
    })
  }
})