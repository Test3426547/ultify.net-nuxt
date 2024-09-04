import { defineEventHandler } from 'h3'
import { useStrapi4 } from '@nuxtjs/strapi'

export default defineEventHandler(async (event) => {
  const strapi = useStrapi4()

  try {
    const [headerService, contentCreationBlog, contentCreationDetails, consultation, digitalWorld, faq, cta] = await Promise.all([
      strapi.find('api::header-service.header-service', { 
        filters: { service: { slug: 'content-creation' } },
        populate: '*' 
      }),
      strapi.find('api::content-creation-blog.content-creation-blog', { populate: '*' }),
      strapi.find('api::content-creation-details.content-creation-details', { populate: '*' }),
      strapi.find('api::consultation.consultation', { populate: '*' }),
      strapi.find('api::digital-world.digital-world', { populate: '*' }),
      strapi.find('api::faq.faq', { 
        filters: { service: { slug: 'content-creation' } },
        populate: '*' 
      }),
      strapi.find('api::cta.cta', { populate: '*' })
    ])

    const serviceName = 'Content Creation'
    const serviceSlug = 'content-creation'

    return {
      headerService: headerService.data,
      contentCreationBlog: contentCreationBlog.data,
      contentCreationDetails: contentCreationDetails.data,
      consultation: consultation.data,
      digitalWorld: digitalWorld.data,
      faq: faq.data,
      cta: cta.data,
      serviceId: 5, // Content Creation service ID
      meta: {
        title: `${serviceName} Services | Ultify Solutions`,
        description: 'Elevate your brand with Ultify Solutions\' expert content creation services. Engage your audience with compelling, SEO-optimized content across all platforms.',
        ogImage: `https://ultifysolutions.com/images/${serviceSlug}-og.jpg`,
        ogUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
        canonicalUrl: `https://ultifysolutions.com/services/${serviceSlug}`,
        robots: 'index, follow'
      },
      schema: {
        service: {
          name: `${serviceName} Services`,
          description: 'Comprehensive content creation services to elevate your brand and engage your audience. We offer SEO-optimized content across various formats and platforms, tailored to your business goals and target audience.',
          provider: 'Ultify Solutions',
          serviceType: serviceName,
          areaServed: 'Sydney, Australia',
          offers: [
            { name: 'Blog Writing' },
            { name: 'Social Media Content' },
            { name: 'Video Production' },
            { name: 'Infographic Design' },
            { name: 'Whitepaper Creation' }
          ],
          techniques: [
            { name: 'SEO Optimization' },
            { name: 'Audience Research' },
            { name: 'Brand Voice Development' },
            { name: 'Content Strategy' },
            { name: 'Content Performance Analysis' }
          ]
        },
        faq: [
          {
            question: 'What types of content do you create?',
            answer: 'We create a wide range of content including blog posts, social media content, videos, infographics, whitepapers, e-books, case studies, and more. Our content is tailored to your specific needs and target audience.'
          },
          {
            question: 'How does content creation benefit my business?',
            answer: 'Content creation benefits your business by improving your online visibility, establishing your brand as an industry authority, engaging your target audience, driving website traffic, generating leads, and supporting your overall marketing and SEO efforts.'
          },
          {
            question: 'Do you optimize content for SEO?',
            answer: 'Yes, we optimize all content for SEO. This includes keyword research, strategic keyword placement, meta descriptions, title tags, and internal linking. Our goal is to create content that not only engages your audience but also ranks well in search engines.'
          }
        ]
      }
    }
  } catch (error) {
    console.error('Error fetching content creation page data:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error fetching content creation page data'
    })
  }
})