<template>
  <section class="min-h-screen bg-ultify-blue py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between">
    <div class="max-w-7xl mx-auto w-full">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-8">
        <span class="text-ultify-dark-grey">Recent</span>
        <span class="text-white"> Conent Creation Articles</span>
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Card 
          v-for="article in articles" 
          :key="article.id" 
          class="bg-white overflow-hidden flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-xl"
        >
          <CardContent class="p-4 flex flex-col h-full">
            <img :src="article.image" :alt="article.title" class="w-full h-48 object-cover mb-4" />
            <Badge class="mb-2 self-start text-xs">Social Media</Badge>
            <h3 class="text-sm font-semibold mb-2 line-clamp-2">{{ article.title }}</h3>
            <p class="text-xs text-gray-600 mb-4 flex-grow line-clamp-3">{{ article.excerpt }}</p>
            <a :href="'#' + article.id" class="text-xs font-semibold text-ultify-blue self-start flex items-center hover:underline">
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
import { onMounted } from 'vue'
import gsap from 'gsap'
  
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

  onMounted(() => {
  gsap.from('.card', {
    opacity: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power3.out'
  })
})
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

.card {
  transition: all 0.3s ease;
}

.card:hover {
  animation: bounce 0.5s ease infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>