import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../redux/articles/operations.js';  
import {
  selectArticles,
  selectIsLoading,
} from '../../redux/articles/selectors.js';
import ArticleCard from '../../components/ArticleCard/ArticleCard.jsx';
import css from './ArticlesPage.module.css';
import Container from './../../components/Container/Container.jsx';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    // Завантажуємо тільки якщо список порожній
    if (articles.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, articles.length]);

  return (
    <section className={css.section}>
      <Container>
        <h2>Community Articles</h2>
        {isLoading && <p>Loading...</p>}
        <ul className={css.list}>
          {articles.map(article => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default ArticlesPage;
