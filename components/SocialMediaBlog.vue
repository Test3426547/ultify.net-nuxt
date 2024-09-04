<template>
    <section class="min-h-screen bg-ultify-blue py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
          <span class="text-white opacity-50">Recent</span>
          <span class="text-white"> Social Media Articles</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="article in articles" :key="article.id" class="bg-white overflow-hidden">
            <CardContent class="p-0">
              <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <Badge class="mb-2">Social Media</Badge>
                <h3 class="text-xl font-semibold mb-2">{{ article.title }}</h3>
                <p class="text-gray-600 mb-4">{{ article.excerpt }}</p>
                <Button variant="link" class="p-0 h-auto font-semibold text-ultify-blue">
                  Read More
                  <ArrowRightIcon class="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { Card, CardContent } from '@/components/ui/card'
  import { Badge } from '@/components/ui/badge'
  import { Button } from '@/components/ui/button'
  import { ArrowRightIcon } from '@heroicons/vue/24/solid'
  
  const articles = [
    {
      id: 1,
      title: "Mastering Social Media Algorithm Changes: Stay Ahead of the Curve",
      excerpt: "Learn how to adapt your social media strategy to the latest algorithm updates and maintain your brand's visibility across platforms.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "The Art of Social Listening: Turning Insights into Action",
      excerpt: "Discover how to effectively monitor and analyze social media conversations to inform your marketing strategy and improve customer engagement.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Creating Viral Content: Strategies for Explosive Social Media Growth",
      excerpt: "Explore proven techniques to create shareable content that has the potential to go viral and significantly boost your social media presence.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Influencer Partnerships: Building Authentic Relationships for Brand Success",
      excerpt: "Learn how to identify, approach, and collaborate with influencers to expand your reach and build credibility on social media platforms.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "Social Media Advertising: Maximizing ROI Across Platforms",
      excerpt: "Discover strategies to create effective paid social media campaigns that drive conversions and provide measurable returns on investment.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "The Power of User-Generated Content in Social Media Marketing",
      excerpt: "Explore how to encourage, curate, and leverage user-generated content to build community and trust around your brand on social media.",
      image: "/ultify.svg?height=200&width=400",
    },
  ]
  </script>