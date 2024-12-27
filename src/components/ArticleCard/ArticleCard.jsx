import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const ArticleCard = ({ article }) => {
    return (
        <Card>
            {/* Anchor tag wrapping the image */}
            <a href={article.url} target="_blank" rel="noopener noreferrer">
                <CardMedia
                    component="img"
                    height="140"
                    image={article.image}
                    alt={article.title}
                />
            </a>
            <CardContent>
                {/* Anchor tag wrapping the title */}
                <Typography variant="h6">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {article.title}
                    </a>
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {article.description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Source: {article.source}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Category: {article.category}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Published: {article.publishedDate || 'Unknown'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ArticleCard;
