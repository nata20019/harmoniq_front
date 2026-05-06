import Container from '../Container/Container.jsx';
import ArticleCard from '../ArticleCard/ArticleCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectArticles,
  selectIsLoading,
} from '../../redux/articles/selectors.js';
import { fetchArticles } from '../../redux/articles/operations.js';
import { useEffect } from 'react';
import css from './PopularArticles.module.css';

const PopularArticles = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  if (isLoading) return <p className={css.loading}>Loading articles...</p>;

  // Перевіряємо, чи є взагалі статті
  if (!articles || articles.length === 0) return <p>No articles found.</p>;

  return (
    <section className={css.section}>
      <Container>
        <div className={css.header}>
          <h2 className={css.title}>Popular Articles</h2>
          <Link to="/articles" className={css.linkAll}>
            Go to all Articles ↗
          </Link>
        </div>

        <ul className={css.grid}>
          {/* Додаємо перевірку довжини масиву */}
          {articles.length > 0 ? (
            articles
              .slice(0, 3)
              .map(article => (
                <ArticleCard key={article._id} article={article} />
              ))
          ) : (
            <p>Loading articles...</p>
          )}
        </ul>
      </Container>
    </section>
  );
};

export default PopularArticles;
