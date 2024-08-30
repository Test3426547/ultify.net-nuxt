// server/api/header-data.js
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const strapiUrl = config.public.strapiUrl;
  
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
      return null;
    }
  });