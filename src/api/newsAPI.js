export const fetchFromNewsAPI = async (query, page = 1) => {
    const apiKey = "0b47c942ddf442ccb02faba5d6355539";
    const url = `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    return data.articles.map((article) => ({
        title: article.title,
        author: article.author || "Unknown",
        category: article.source.name || "General",
        source: "NewsAPI",
        publishedAt: article.publishedAt,
        url: article.url,
        image: article.urlToImage
    }));
};
