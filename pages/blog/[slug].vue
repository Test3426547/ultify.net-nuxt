<!-- pages/blog/[slug].vue -->
<template>
    <div>
      <SeoMeta
        :title="post.title + ' | Ultify Solutions Blog'"
        :description="post.excerpt"
        :ogImage="post.featuredImage"
        :ogUrl="`https://ultifysolutions.com/blog/${post.slug}`"
      />
      <!-- Rest of your blog post content -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import SeoMeta from '~/components/SeoMeta.vue'
  
  const route = useRoute()
  const post = ref({
    title: 'Placeholder Title',
    excerpt: 'Placeholder excerpt for the blog post.',
    featuredImage: '/default-blog-image.jpg',
    slug: route.params.slug
  })
  
  // In the future, you'll fetch the post data here
  // const { data: post } = await useFetch(`/api/posts/${route.params.slug}`)
  </script>
  