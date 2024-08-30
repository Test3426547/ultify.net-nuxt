// server/api/header-data.js
import { useStrapi3 } from '#strapi';

export default defineEventHandler(async (event) => {
  const strapi = useStrapi3();
  try {
    const response = await strapi.find('headers');
    return Array.isArray(response.data) && response.data.length > 0
      ? response.data[0].attributes
      : null;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
});