import React, { useEffect, useState } from 'react';
import { fetchFromGuardianAPI } from '../../api/guardianAPI';
import { fetchFromNewsAPI } from '../../api/newsAPI';
import { fetchFromNYTAPI } from '../../api/nytAPI';
import './LatestNews.scss';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';

const LatestNews = () => {
    const [latestNews, setLatestNews] = useState([]);

    useEffect(() => {
        const fetchLatestNews = async () => {
            const guardianArticles = await fetchFromGuardianAPI('latest', 1);
            const newsAPIArticles = await fetchFromNewsAPI('latest', 1);
            const nytArticles = await fetchFromNYTAPI('latest', 1);

            const combinedArticles = [
                ...guardianArticles.map(article => ({
                    ...article,
                    sourceUrl: article.webUrl || article.url, // Map correct field
                })),
                ...newsAPIArticles.map(article => ({
                    ...article,
                    sourceUrl: article.url, // Map correct field
                })),
                ...nytArticles.map(article => ({
                    ...article,
                    sourceUrl: article.url, // Map correct field
                })),
            ]
                .sort(() => 0.5 - Math.random())
                .slice(0, 6); // Randomize and limit to 6 articles

            setLatestNews(combinedArticles);
        };

        fetchLatestNews();
    }, []);

    // Function to truncate titles
    const truncateTitle = (title) => {
        return title.length > 66 ? title.slice(0, 66) + '...' : title;
    };

    return (
        <div className="latest-news-section">
            <Container className="latest-news" maxWidth="lg">
                <Typography variant="h4" gutterBottom className="section-title">
                    Latest News
                </Typography>
                <Grid container spacing={3}>
                    {latestNews.map((article, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card className="latest-news-card">
                                <a
                                    href={article.sourceUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="news-image-link"
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={article.image || 'https://via.placeholder.com/150'}
                                        alt={article.title}
                                    />
                                </a>
                                <CardContent>
                                    <a
                                        href={article.sourceUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="news-title-link"
                                    >
                                        <Typography variant="h6" component="div">
                                            {truncateTitle(article.title)}
                                        </Typography>
                                    </a>
                                    <Typography variant="body2" color="text.secondary">
                                        {new Date(article.publishedDate || article.publishedAt).toLocaleDateString()} - {article.source}
                                    </Typography>
                                    <Typography variant="body2" className="description">
                                        {article.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default LatestNews;
