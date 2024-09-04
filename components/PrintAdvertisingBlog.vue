<template>
    <section class="min-h-screen bg-ultify-blue py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <h2 class="text-4xl md:text-5xl font-bold text-center mb-12">
          <span class="text-white opacity-50">Recent</span>
          <span class="text-white"> Print Advertising Articles</span>
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card v-for="article in articles" :key="article.id" class="bg-white overflow-hidden">
            <CardContent class="p-0">
              <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover" />
              <div class="p-6">
                <Badge class="mb-2">Print Advertising</Badge>
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
      title: "The Power of Print: Why Traditional Advertising Still Matters in a Digital World",
      excerpt: "Discover how print advertising continues to be a valuable asset in your marketing mix, offering unique benefits that digital channels can't replicate.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 2,
      title: "Designing Eye-Catching Print Ads: Tips and Tricks for Maximum Impact",
      excerpt: "Learn the essential design principles that will make your print advertisements stand out and capture your audience's attention effectively.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 3,
      title: "Measuring ROI in Print Advertising: Strategies for Tracking Success",
      excerpt: "Explore innovative methods to measure and analyze the return on investment of your print advertising campaigns in the modern marketing landscape.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 4,
      title: "Print and Digital Integration: Creating a Seamless Multi-Channel Experience",
      excerpt: "Discover how to effectively combine print and digital advertising strategies to create a cohesive and powerful marketing campaign.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 5,
      title: "The Psychology of Print: How Color and Typography Influence Consumer Behavior",
      excerpt: "Delve into the psychological aspects of print advertising and learn how to use color theory and typography to evoke desired responses from your audience.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      id: 6,
      title: "Sustainable Print Advertising: Eco-Friendly Practices for Modern Businesses",
      excerpt: "Explore environmentally conscious approaches to print advertising that align with growing consumer demand for sustainable business practices.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]
  </script>