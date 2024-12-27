import axios from 'axios';

export const fetchFromGuardianAPI = async (query, page = 1) => {
    try {
        const apiKey = '';
        const response = await axios.get(
            `https://content.guardianapis.com/search`,
            {
                params: {
                    q: query,
                    'api-key': apiKey,
                    'show-fields': 'thumbnail',
                    page,
                    pageSize: 10,
                },
            }
        );

        return response.data.response.results.map((article) => ({
            title: article.webTitle,
            description: article.fields?.trailText || 'No description available',
            image: article.fields?.thumbnail || null,
            source: 'The Guardian',
            category: article.sectionName,
            author: article.fields?.byline || 'Unknown',
            publishedDate: article.webPublicationDate,
            url: article.webUrl,
        }));
    } catch (error) {
        console.error('Error fetching articles from The Guardian:', error);
        return [];
    }
};
