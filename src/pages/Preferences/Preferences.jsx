import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import { fetchFromNewsAPI } from '../../api/newsAPI';
import { fetchFromGuardianAPI } from '../../api/guardianAPI';
import { fetchFromNYTAPI } from '../../api/nytAPI';
import './Preferences.module.scss';

const Preferences = () => {
    const [selectedSources, setSelectedSources] = useState(['NewsAPI']);
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState('');

    const availableSources = ['NewsAPI', 'The Guardian', 'New York Times'];
    const articlesPerPage = 9;

    useEffect(() => {
        if (!query) {
            setArticles([]);
            setFilteredArticles([]);
            setCategories([]);
            setAuthors([]);
            setTotalPages(1);
            return;
        }

        const fetchArticles = async () => {
            let allArticles = [];

            if (selectedSources.includes('NewsAPI')) {
                const newsAPIArticles = await fetchFromNewsAPI(query, page);
                allArticles = allArticles.concat(newsAPIArticles);
            }

            if (selectedSources.includes('The Guardian')) {
                const guardianArticles = await fetchFromGuardianAPI(query, page);
                allArticles = allArticles.concat(guardianArticles);
            }

            if (selectedSources.includes('New York Times')) {
                const nytArticles = await fetchFromNYTAPI(query, page);
                allArticles = allArticles.concat(nytArticles);
            }

            const unifiedArticles = allArticles.map((article) => ({
                ...article,
                image: article.image || 'https://via.placeholder.com/150',
                author: article.author || 'Unknown',
                category: article.category || 'General',
            }));

            setArticles(unifiedArticles);

            const uniqueCategories = [...new Set(unifiedArticles.map((a) => a.category))];
            setCategories(uniqueCategories);

            const uniqueAuthors = [...new Set(unifiedArticles.map((a) => a.author))];
            setAuthors(uniqueAuthors);

            setTotalPages(Math.ceil(unifiedArticles.length / articlesPerPage));
        };

        fetchArticles();
    }, [query, page, selectedSources]);

    useEffect(() => {
        let filtered = articles;

        if (selectedCategory) {
            filtered = filtered.filter((article) => article.category === selectedCategory);
        }

        if (selectedAuthor) {
            filtered = filtered.filter((article) => article.author === selectedAuthor);
        }

        setFilteredArticles(filtered);
    }, [selectedCategory, selectedAuthor, articles]);

    const displayedArticles = filteredArticles.slice(
        (page - 1) * articlesPerPage,
        page * articlesPerPage
    );

    return (
        <Container>
            <h2>Set Your Preferences</h2>
            <FormControl className="form-control" fullWidth margin="normal" variant="outlined">
                <InputLabel>Select News Sources</InputLabel>
                <Select
                    multiple
                    value={selectedSources}
                    onChange={(e) => setSelectedSources(e.target.value)}
                    renderValue={(selected) => selected.join(', ')}
                >
                    {availableSources.map((source) => (
                        <MenuItem key={source} value={source}>
                            {source}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                className="text-field"
                fullWidth
                label="Search for articles"
                variant="outlined"
                margin="normal"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <FormControl className="form-control" fullWidth margin="normal" variant="outlined">
                <InputLabel>Filter by Category</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl className="form-control" fullWidth margin="normal" variant="outlined">
                <InputLabel>Filter by Author</InputLabel>
                <Select
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                >
                    <MenuItem value="">All Authors</MenuItem>
                    {authors.map((author) => (
                        <MenuItem key={author} value={author}>
                            {author}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={3}>
                {displayedArticles.map((article, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <ArticleCard article={article} />
                    </Grid>
                ))}
            </Grid>
            {totalPages > 1 && (
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => setPage(value)}
                    style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}
                />
            )}
        </Container>
    );
};

export default Preferences;
