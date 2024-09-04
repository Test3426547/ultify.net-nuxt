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
      title: "Mastering the Art of Storytelling in Content Marketing",
      excerpt: "Learn how to craft compelling narratives that resonate with your audience and drive engagement across various content formats.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "The Power of Visual Content: Boosting Engagement with Images and Videos",
      excerpt: "Discover strategies to create and leverage visual content that captures attention and enhances your brand's message.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "SEO-Driven Content Creation: Writing for Both Humans and Search Engines",
      excerpt: "Explore techniques to create content that ranks well in search engines while providing value to your human readers.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Content Repurposing: Maximizing the Value of Your Creative Efforts",
      excerpt: "Learn how to efficiently repurpose your content across multiple platforms to reach a wider audience and save time.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "The Role of AI in Modern Content Creation: Tools and Techniques",
      excerpt: "Explore how artificial intelligence is revolutionizing content creation and how you can leverage AI tools to enhance your workflow.",
      image: "/ultify.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Creating Evergreen Content: Strategies for Long-Lasting Value",
      excerpt: "Discover how to develop timeless content that continues to attract and engage your audience long after publication.",
      image: "/ultify.svg?height=200&width=400",
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