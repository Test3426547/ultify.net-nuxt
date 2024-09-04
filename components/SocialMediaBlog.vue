<template>
    <section class="min-h-screen bg-ultify-blue py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div class="max-w-7xl mx-auto w-full">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
          <span class="text-white opacity-50">Recent</span>
          <span class="text-white"> Social Media Articles</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card v-for="article in articles" :key="article.id" class="bg-white overflow-hidden flex flex-col">
            <CardContent class="p-0 flex-grow flex flex-col">
              <img :src="article.image" :alt="article.title" class="w-full h-32 object-cover" />
              <div class="p-4 flex flex-col flex-grow">
                <Badge class="mb-2 self-start">Social Media</Badge>
                <h3 class="text-lg font-semibold mb-2">{{ article.title }}</h3>
                <p class="text-gray-600 text-sm mb-4 flex-grow">{{ article.excerpt }}</p>
                <Button variant="link" class="p-0 h-auto font-semibold text-ultify-blue self-start">
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
      title: "Mastering Social Media Algorithm Changes",
      excerpt: "Learn how to adapt your social media strategy to the latest algorithm updates and maintain your brand's visibility across platforms.",
      image: "/ultify.svg?height=128&width=384",
    },
    {
      id: 2,
      title: "The Art of Social Listening",
      excerpt: "Discover how to effectively monitor and analyze social media conversations to inform your marketing strategy and improve customer engagement.",
      image: "/ultify.svg?height=128&width=384",
    },
    {
      id: 3,
      title: "Creating Viral Content",
      excerpt: "Explore proven techniques to create shareable content that has the potential to go viral and significantly boost your social media presence.",
      image: "/ultify.svg?height=128&width=384",
    },
    {
      id: 4,
      title: "Influencer Partnerships",
      excerpt: "Learn how to identify, approach, and collaborate with influencers to expand your reach and build credibility on social media platforms.",
      image: "/ultify.svg?height=128&width=384",
    },
    {
      id: 5,
      title: "Social Media Advertising",
      excerpt: "Discover strategies to create effective paid social media campaigns that drive conversions and provide measurable returns on investment.",
      image: "/ultify.svg?height=128&width=384",
    },
    {
      id: 6,
      title: "The Power of User-Generated Content",
      excerpt: "Explore how to encourage, curate, and leverage user-generated content to build community and trust around your brand on social media.",
      image: "/ultify.svg?height=128&width=384",
    },
  ]
  </script>
  
  <style scoped>
  .card {
    display: flex;
    flex-direction: column;
  }
  
  .card-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  </style>