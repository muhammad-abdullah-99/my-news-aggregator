import React from 'react';
import BreakingNewsSlider from '../../components/BreakingNewsSlider/BreakingNewsSlider';
import LatestNews from "../../components/LatestNews/LatestNews";

const Home = () => {
    return (
        <div>
            <BreakingNewsSlider />
            {/* Other sections of the homepage */}
            <LatestNews />
        </div>
    );
};

export default Home;