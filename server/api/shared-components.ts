export default defineEventHandler(async (event) => {
    const [footerData, ctaData, faqData, digitalWorldData, consultationData] = await Promise.all([
      $fetch('/api/footer'),
      $fetch('/api/cta'),
      $fetch('/api/faq'),
      $fetch('/api/digital-world'),
      $fetch('/api/consultation')
    ])
  
    return {
      footer: footerData,
      cta: ctaData,
      faq: faqData,
      digitalWorld: digitalWorldData,
      consultation: consultationData
    }
  })