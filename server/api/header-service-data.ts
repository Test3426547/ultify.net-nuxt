export default defineEventHandler(async (event) => {
    const strapiUrl = 'https://backend.mcdonaldsz.com';
    const query = useQuery(event);
    const serviceId = query.id || '1'; // Default to 1 if no ID is provided
    const endpoint = `/api/header-services/${serviceId}`;
    const populateQuery = '?populate=deep';

    try {
        const response = await fetch(`${strapiUrl}${endpoint}${populateQuery}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data ? data.data.attributes : null;
    } catch (error) {
        console.error('Error fetching header data:', error);
        console.error('Attempted to fetch from:', `${strapiUrl}${endpoint}${populateQuery}`);
        return null;
    }
});