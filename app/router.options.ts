import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    // Always return to the top of the page, no scrolling
    return { left: 0, top: 0 }
  }
}