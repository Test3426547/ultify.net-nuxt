import { useStrapi } from '#imports';

export default defineEventHandler(async (event) => {
  const { find } = useStrapi();
  try {
    const response = await find('headers');
    // Add type checking for response.data
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Ensure attributes exist before returning
      return response.data[0].attributes ?? null;
    }
    return null;
  } catch (error) {
    // Improve error logging
    console.error('Error fetching header data:', error instanceof Error ? error.message : String(error));
    // Consider throwing an error instead of returning null
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to fetch header data',
    });
  }
});