export default defineEventHandler(async (event) => {
    const [headerData, quickNEasyData, carouselData, serviceSelectorData] = await Promise.all([
      $fetch('/api/header-home'),
      $fetch('/api/quick-n-easy'),
      $fetch('/api/carousel'),
      $fetch('/api/our-services')
    ])
  
    return {
      metaTitle: 'Home | Ultify Solutions',
      metaDescription: 'Ultify Solutions is a leading digital marketing agency offering innovative strategies to boost your online presence.',
      ogImage: 'https://ultifysolutions.com/images/home-og.jpg',
      ogUrl: 'https://ultifysolutions.com',
      canonicalUrl: 'https://ultifysolutions.com',
      robots: 'index, follow',
      headerHome: headerData,
      quickNEasy: quickNEasyData,
      carousel: carouselData,
      ourServices: serviceSelectorData
    }
  })