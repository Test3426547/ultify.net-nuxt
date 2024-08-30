import { useStrapi } from '#imports';

export default defineEventHandler(async (event) => {
  const { find } = useStrapi();
  try {
    const response = await find('headers');
    if (response.data && response.data.length > 0) {
      return response.data[0].attributes;
    }
    return null;
  } catch (error) {
    console.error('Error fetching header data:', error);
    return null;
  }
});