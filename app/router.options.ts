import type { RouterConfig } from '@nuxt/schema'

// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // If the route has a hash, scroll to it
    if (to.hash) {
      return {
        el: to.hash,
        top: 0,
        behavior: 'instant'
      }
    }

    // If it's a page reload, maintain the current scroll position
    if (from.path === to.path) {
      return savedPosition || { left: 0, top: 0 }
    }

    // For navigation to a new page, scroll to top instantly
    return { left: 0, top: 0, behavior: 'instant' }
  }
}