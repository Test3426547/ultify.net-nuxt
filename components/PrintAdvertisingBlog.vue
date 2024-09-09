<template>
  <section class="min-h-screen bg-ultify-blue py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-start">
    <div class="max-w-7xl mx-auto w-full">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
        <span class="text-white opacity-50">Recent</span>
        <span class="text-white"> Print Advertising Articles</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card v-for="article in articles" :key="article.id" class="bg-white overflow-hidden flex flex-col">
          <img :src="article.image" :alt="article.title" class="w-full h-32 sm:h-40 object-cover rounded-t-3xl" />
          <CardContent class="p-3 sm:p-4 flex flex-col h-full">
            <Badge class="mb-2 self-start text-xs bg-ultify-blue text-white">Print Advertising</Badge>
            <h3 class="text-sm font-semibold mb-2 line-clamp-2">{{ article.title }}</h3>
            <p class="text-xs text-gray-600 mb-3 flex-grow line-clamp-3">{{ article.excerpt }}</p>
            <a :href="`/blog/${article.id}`" class="text-xs font-semibold text-ultify-blue self-start flex items-center hover:underline">
              Read More
              <ArrowRightIcon class="ml-1 h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRightIcon } from '@heroicons/vue/24/solid'

const articles = [
  {
    id: 1,
    title: "The Power of Print: Why Traditional Advertising Still Matters in a Digital World",
    excerpt: "Discover how print advertising continues to be a valuable asset in your marketing mix, offering unique benefits that digital channels can't replicate.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "Designing Eye-Catching Print Ads: Tips and Tricks for Maximum Impact",
    excerpt: "Learn the essential design principles that will make your print advertisements stand out and capture your audience's attention effectively.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Measuring ROI in Print Advertising: Strategies for Tracking Success",
    excerpt: "Explore innovative methods to measure and analyze the return on investment of your print advertising campaigns in the modern marketing landscape.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Print and Digital Integration: Creating a Seamless Multi-Channel Experience",
    excerpt: "Discover how to effectively combine print and digital advertising strategies to create a cohesive and powerful marketing campaign.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "The Psychology of Print: How Color and Typography Influence Consumer Behavior",
    excerpt: "Delve into the psychological aspects of print advertising and learn how to use color theory and typography to evoke desired responses from your audience.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "Sustainable Print Advertising: Eco-Friendly Practices for Modern Businesses",
    excerpt: "Explore environmentally conscious approaches to print advertising that align with growing consumer demand for sustainable business practices.",
    image: "/ultify.svg?height=200&width=400",
  },
]
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 639px) {
  .line-clamp-3 {
    -webkit-line-clamp: 2;
  }
}
</style>