import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../../components/Hero/Hero.jsx';
import AboutUs from '../../components/AboutUs/AboutUs.jsx';
import Creators from '../../components/Creators/Creators.jsx';
import PopularArticles from '../../components/PopularArticles/PopularArticles.jsx';

const HomePage = () => {

const BASE_URL = 'https://harmoniq-back.onrender.com/';
const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/articles`);
        console.log('Fetched articles:', response.data);
        setArticles(response.data.data.articles || response.data.data); // Враховуємо можливість, що data може бути undefined
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <>
      <Hero />
      <AboutUs />
      <PopularArticles articles={articles} />
      <Creators />
    </>
  );
};

export default HomePage;
