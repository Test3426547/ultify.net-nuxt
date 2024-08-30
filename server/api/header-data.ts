export default defineEventHandler(async (event) => {
    // Hardcode the Strapi URL
    const strapiUrl = 'https://backend.mcdonaldsz.com';
  
    try {
      const response = await fetch(`${strapiUrl}/api/headers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return Array.isArray(data.data) && data.data.length > 0
        ? data.data[0].attributes
        : null;
    } catch (error) {
      console.error('Error fetching header data:', error);
      console.error('Attempted to fetch from:', `${strapiUrl}/api/headers`);
      return null;
    }
  });