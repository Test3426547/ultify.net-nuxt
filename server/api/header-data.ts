// server/api/header-data.js
import { Strapi } from '@strapi/strapi';

const strapi = new Strapi({
  url: process.env.STRAPI_URL || 'http://localhost:1337',
  prefix: '/api',
});

export default defineEventHandler(async (event) => {
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