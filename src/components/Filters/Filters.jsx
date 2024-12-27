
import React, { useEffect, useState } from "react";
import "../assets/styles/components/filters.scss";
import { fetchArticlesBySource } from "../utils";

const Filters = () => {
    const [articles, setArticles] = useState([]);
    const [source, setSource] = useState("all");

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await fetchArticlesBySource(source);
            setArticles(data);
        };

        fetchArticles();
    }, [source]);

    return (
        <div className="filters-container">
            <select onChange={(e) => setSource(e.target.value)}>
                <option value="all">All Sources</option>
                <option value="guardian">The Guardian</option>
                <option value="newsapi">News API</option>
                <option value="nyt">New York Times</option>
            </select>
            <div className="articles">
                {articles.map((article, index) => (
                    <div className="article-card" key={index}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <small>{article.source}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Filters;