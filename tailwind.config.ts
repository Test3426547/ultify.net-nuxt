import type { Config } from 'tailwindcss'

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'ultify-blue': '#37b5ff',
        'ultify-grey': '#e9ecef',
        'ultify-dark-grey': '#2B2A2A',
      },
    },
  },
  plugins: [],
} satisfies Config