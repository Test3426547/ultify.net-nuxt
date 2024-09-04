import { defineEventHandler } from 'h3'
import { useStrapi } from '~/utils/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi()

  try {
    const [headerService, serviceTechnologyLeft, serviceTechnologyRight, websiteDetails, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'website-development' } },
        populate: '*' 
      }),
      strapi.find('api::service-technology-left.service-technology-left', { 
        filters: { service: { slug: 'website-development' } },
        populate: '*' 
      }),
      strapi.find('api::service-technology-right.service-technology-right', { 
        filters: { service: { slug: 'website-development' } },
        populate: '*' 
      }),
      strapi.find('api::website-details.website-details', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'website-development' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'Website Development'
    const serviceSlug = 'website-development'

    return {
      headerService: headerService.data,
      serviceTechnologyLeft: serviceTechnologyLeft.data,
      serviceTechnologyRight: serviceTechnologyRight.data,
      websiteDetails: websiteDetails.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 1, // Website Development service ID
      metaTitle: `${serviceName} Services | Ultify Solutions`,
      metaDescription: 'Expert website development services from Ultify Solutions. Create stunning, responsive, and high-performing websites tailored to your business needs.',
      ogImage: `https://ultifysolutions.com/images/${serviceSlug}-og.jpg`,
      ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
      robots: 'index, follow',
      title: `${serviceName} Services`,
      description: 'Professional website development services tailored to your business needs. We create responsive, high-performing, and visually appealing websites.',
      serviceName: `${serviceName} Services`,
      serviceDescription: 'Professional website development services tailored to your business needs. We create responsive, high-performing, and visually appealing websites.',
      serviceType: 'Website Development',
      offers: [
        { name: 'Custom Website Design' },
        { name: 'E-commerce Development' },
        { name: 'Content Management Systems (CMS)' },
        { name: 'Responsive Web Design' },
        { name: 'Website Maintenance and Support' }
      ],
      hasOfferCatalog: {
        name: 'Website Development Services',
        itemListElement: [
          {
            name: 'Development Technologies',
            itemListElement: [
              { name: 'HTML5 & CSS3' },
              { name: 'JavaScript (React, Vue, Angular)' },
              { name: 'PHP' },
              { name: 'Node.js' },
              { name: 'Python' }
            ]
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching Website Development page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching Website Development page data'
    })
  }
})