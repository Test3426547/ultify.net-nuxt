import Strapi from '@nuxtjs/strapi';

// Create and export the Strapi instance
export const strapi = new Strapi({
  url: process.env.STRAPI_URL || 'https://backend.mcdonaldsz.com',
  prefix: '/api',
  version: 'v4',
});

export default defineEventHandler(async (event) => {
  console.log('Fetching header data from Strapi...');
  try {
    const response = await strapi.find('headers');
    if (Array.isArray(response.data) && response.data.length > 0) {
      console.log('Header data fetched successfully');
      return response.data[0].attributes ?? null;
    }
    console.log('No header data found');
    return null;
  } catch (error) {
    console.error('Error fetching header data:', error instanceof Error ? error.message : String(error));
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch header data',
    });
  }
});