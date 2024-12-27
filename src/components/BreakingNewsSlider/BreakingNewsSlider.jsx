import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './BreakingNewsSlider.scss';
import { fetchFromNewsAPI } from '../../api/newsAPI';
import { fetchFromGuardianAPI } from '../../api/guardianAPI';
import { fetchFromNYTAPI } from '../../api/nytAPI';

const BreakingNewsSlider = () => {
    const [breakingNews, setBreakingNews] = useState([]);

    useEffect(() => {
        const fetchBreakingNews = async () => {
            const newsAPIArticles = await fetchFromNewsAPI('breaking news', 1);
            const guardianArticles = await fetchFromGuardianAPI('breaking news', 1);
            const nytArticles = await fetchFromNYTAPI('breaking news', 1);

            const combinedArticles = [
                ...newsAPIArticles,
                ...guardianArticles,
                ...nytArticles,
            ];

            setBreakingNews(
                combinedArticles.sort(() => 0.5 - Math.random()).slice(0, 9)
            );
        };

        fetchBreakingNews();
    }, []);

    const truncateTitle = (title) => {
        return title.length > 42 ? title.slice(0, 42) + '...' : title;
    };

    return (
        <div className="breaking-news-slider container">
            <Swiper
                spaceBetween={30}
                loop={true}
                pagination={{ clickable: true }}
                breakpoints={{
                    0: {
                        slidesPerView: 1, // 1 slide for screen widths <= 767px
                    },
                    767: {
                        slidesPerView: 2, // 2 slides for screen widths > 767px and <= 1040px
                    },
                    1041: {
                        slidesPerView: 3, // 3 slides for screen widths > 1040px
                    },
                }}
            >
                {breakingNews.map((article, index) => (
                    <SwiperSlide key={index}>
                        <div className="news-card">
                            <a
                                href={article.url || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="news-image-link"
                            >
                                <img
                                    src={article.image || 'https://via.placeholder.com/150'}
                                    alt={article.title}
                                    className="news-image"
                                />
                            </a>
                            <div className="news-content">
                                <a
                                    href={article.url || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="news-title-link"
                                >
                                    <h4>{truncateTitle(article.title)}</h4>
                                </a>
                                <p>{new Date(article.publishedDate).toLocaleString()}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BreakingNewsSlider;
