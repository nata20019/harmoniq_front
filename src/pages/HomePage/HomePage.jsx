import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import Creators from '../../components/Creators/Creators.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import PopularArticles from '../../components/PopularArticles/PopularArticles.jsx';
import Header from 'components/Header/Header.jsx';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Header />
      <Hero />
      <AboutUs />
      {/* <PopularArticles articles={articles} /> */}
      <Creators />
      <Footer />
    </>
  );
};

export default HomePage;
