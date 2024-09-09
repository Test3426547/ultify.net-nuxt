<template>
  <section class="min-h-screen bg-ultify-blue py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-start">
    <div class="max-w-7xl mx-auto w-full">
      <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6">
        <span class="text-white opacity-50">Recent</span>
        <span class="text-white"> Social Media Articles</span>
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card v-for="article in articles" :key="article.id" class="bg-white overflow-hidden flex flex-col">
          <img :src="article.image" :alt="article.title" class="w-full h-32 sm:h-40 object-cover rounded-t-3xl" />
          <CardContent class="p-3 sm:p-4 flex flex-col h-full">
            <Badge class="mb-2 self-start text-xs bg-ultify-blue text-white">Social Media</Badge>
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
    title: "Mastering Social Media Algorithm Changes",
    excerpt: "Learn how to adapt your social media strategy to the latest algorithm updates and maintain your brand's visibility across platforms.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 2,
    title: "The Art of Social Listening",
    excerpt: "Discover how to effectively monitor and analyze social media conversations to inform your marketing strategy and improve customer engagement.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 3,
    title: "Creating Viral Content",
    excerpt: "Explore proven techniques to create shareable content that has the potential to go viral and significantly boost your social media presence.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 4,
    title: "Influencer Partnerships",
    excerpt: "Learn how to identify, approach, and collaborate with influencers to expand your reach and build credibility on social media platforms.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 5,
    title: "Social Media Advertising",
    excerpt: "Discover strategies to create effective paid social media campaigns that drive conversions and provide measurable returns on investment.",
    image: "/ultify.svg?height=200&width=400",
  },
  {
    id: 6,
    title: "The Power of User-Generated Content",
    excerpt: "Explore how to encourage, curate, and leverage user-generated content to build community and trust around your brand on social media.",
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