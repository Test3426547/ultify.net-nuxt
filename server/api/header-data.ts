import Strapi from '@nuxtjs/strapi';

// Create a Strapi instance with the configuration
const strapi = newStrapi({
  url: process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com',
  prefix: '/api',
  version: 'v4',
});

export default defineEventHandler(async (event) => {
  try {
    const response = await strapi.find('headers');
    if (Array.isArray(response.data) && response.data.length > 0) {
      return response.data[0].attributes ?? null;
    }
    return null;
  } catch (error) {
    console.error('Error fetching header data:', error instanceof Error ? error.message : String(error));
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch header data',
    });
  }
});
