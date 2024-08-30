// utils/structuredData.ts

export const createOrganizationSchema = (data: {
    name: string;
    url: string;
    logo: string;
    contactPoint?: {
      telephone: string;
      contactType: string;
    };
    sameAs?: string[];
  }) => ({
    type: 'Organization',
    data: {
      name: data.name,
      url: data.url,
      logo: data.logo,
      contactPoint: data.contactPoint ? {
        '@type': 'ContactPoint',
        ...data.contactPoint
      } : undefined,
      sameAs: data.sameAs
    }
  })
  
  export const createWebPageSchema = (data: {
    name: string;
    description: string;
    url: string;
  }) => ({
    type: 'WebPage',
    data: {
      name: data.name,
      description: data.description,
      url: data.url
    }
  })
  
  export const createBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
    type: 'BreadcrumbList',
    data: {
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  })

  export const createContactPageSchema = (data: {
    telephone: string;
    email: string;
    address: {
      streetAddress: string;
      addressLocality: string;
      addressRegion: string;
      postalCode: string;
      addressCountry: string;
    };
  }) => ({
    type: 'ContactPage',
    data: {
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: data.telephone,
        email: data.email
      },
      address: {
        '@type': 'PostalAddress',
        ...data.address
      }
    }
  });

  export const createServiceSchema = (data: {
    name: string;
    description: string;
    provider: string;
    serviceType: string;
    areaServed: string;
    availableChannel: {
      url: string;
      name: string;
    };
  }) => ({
    type: 'Service',
    data: {
      name: data.name,
      description: data.description,
      provider: {
        '@type': 'Organization',
        name: data.provider
      },
      serviceType: data.serviceType,
      areaServed: data.areaServed,
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: data.availableChannel.url,
        servicePlatform: data.availableChannel.name
      }
    }
  });
  
  const serviceSchema = createServiceSchema({
    name: 'Website Development Services',
    description: 'Professional website development services tailored to your business needs. We specialize in responsive design, e-commerce solutions, and custom web applications using cutting-edge technologies like React, Vue.js, and Node.js.',
    provider: 'Ultify Solutions',
    serviceType: 'Website Development',
    areaServed: 'Sydney, Australia',
    availableChannel: {
      url: 'https://ultifysolutions.com/services/website-development',
      name: 'Ultify Solutions Website'
    },
    offers: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-commerce Website Development'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Corporate Website Development'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Web Application Development'
        }
      }
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Website Development Services',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Technologies',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'React Development'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Vue.js Development'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Node.js Development'
              }
            }
          ]
        }
      ]
    }
  });  