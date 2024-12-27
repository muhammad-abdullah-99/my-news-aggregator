import axios from 'axios';

export const fetchFromNYTAPI = async (query, page = 1) => {
    try {
        const apiKey = 'bAuPk68TyojG68qy6a41i7oUcPTkfQrO';
        const response = await axios.get(
            `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
            {
                params: {
                    q: query,
                    'api-key': apiKey,
                    page: page - 1,
                },
            }
        );

        return response.data.response.docs.map((article) => {
            const image = article.multimedia?.find((media) => media.subtype === 'thumbnail');
            const imageUrl = image ? `https://www.nytimes.com/${image.url}` : null;

            return {
                title: article.headline.main,
                description: article.abstract || 'No description available',
                image: imageUrl,
                source: 'New York Times',
                category: article.section_name || 'General',
                author: article.byline?.original || 'Unknown',
                publishedDate: article.pub_date,
                url: article.web_url,
            };
        });
    } catch (error) {
        console.error('Error fetching articles from NYT:', error);
        return [];
    }
};
