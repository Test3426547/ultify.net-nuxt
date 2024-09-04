import { defineEventHandler } from 'h3'
import { useStrapi4 } from '#strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerService, paidMediaTechnology, paidMediaDetails, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'paid-media' } },
        populate: '*' 
      }),
      strapi.find('api::paid-media-technology.paid-media-technology', { populate: '*' }),
      strapi.find('api::paid-media-details.paid-media-details', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'paid-media' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'Paid Media'
    const serviceSlug = 'paid-media'

    return {
      headerService: headerService.data,
      paidMediaTechnology: paidMediaTechnology.data,
      paidMediaDetails: paidMediaDetails.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 4, // Paid Media service ID
      meta: {
        title: `${serviceName} Services | Ultify Solutions`,
        description: 'Maximize your ROI with Ultify Solutions\' expert paid media services. Drive targeted traffic and conversions through strategic PPC, display, and social media advertising campaigns.',
        ogImage: `https://ultifysolutions.com/images/${serviceSlug}-og.jpg`,
        ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
        canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
        robots: 'index, follow'
      },
      schema: {
        service: {
          name: `${serviceName} Services`,
          description: 'Comprehensive paid media services to maximize your ROI and drive targeted traffic. We offer strategic PPC, display advertising, and social media advertising campaigns tailored to your business goals.',
          provider: 'Ultify Solutions',
          serviceType: serviceName,
          areaServed: 'Sydney, Australia',
          offers: [
            { name: 'Google Ads Management' },
            { name: 'Facebook Ads Management' },
            { name: 'LinkedIn Ads Management' },
            { name: 'Display Advertising' },
            { name: 'Retargeting Campaigns' }
          ],
          techniques: [
            { name: 'Audience Targeting' },
            { name: 'Ad Copywriting' },
            { name: 'Bid Management' },
            { name: 'A/B Testing' },
            { name: 'Performance Analytics' }
          ]
        },
        faq: [
          {
            question: 'What is paid media advertising?',
            answer: 'Paid media advertising refers to any form of advertising where you pay to place your content in front of a specific audience. This includes platforms like Google Ads, Facebook Ads, LinkedIn Ads, and display advertising networks.'
          },
          {
            question: 'How can paid media benefit my business?',
            answer: 'Paid media can benefit your business by providing immediate visibility, allowing precise targeting of your ideal audience, offering measurable results, and scaling your marketing efforts quickly. It\'s an effective way to drive traffic, generate leads, and increase conversions.'
          },
          {
            question: 'What platforms do you use for paid media advertising?',
            answer: 'We utilize a variety of platforms based on your target audience and business goals. This typically includes Google Ads for search and display advertising, Facebook and Instagram for social media advertising, LinkedIn for B2B marketing, and various programmatic advertising platforms for broader reach.'
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching paid media page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching paid media page data'
    })
  }
})