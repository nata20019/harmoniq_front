import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../../components/Container/Container.jsx';
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx';
import css from './ArticlesPage.module.css';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/articles`
        );
        setArticles(response.data);
      } catch (error) {
        console.error('Помилка при завантаженні статей:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <section className={css.section}>
      <Container>
        <h2 className={css.title}>Community Articles</h2>
        {isLoading && <p>Loading...</p>}
        <ul className={css.list}>
          {articles.map(article => (
            <ArticleCard key={article._id || article.name} article={article} />
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ArticlesPage;
