import Container from '../Container/Container';
import ArticleCard from '../ArticleCard/ArticleCard';
import css from './PopularArticles.module.css';

// Додаємо = [] щоб уникнути помилки, якщо articles ще не прийшли
const PopularArticles = ({ articles = [] }) => {
  return (
    <section className={css.section}>
      <Container>
        <div className={css.header}>
          <h2 className={css.title}>Popular Articles</h2>
          <a href="/articles" className={css.linkAll}>
            Go to all Articles ↗
          </a>
        </div>

        <ul className={css.grid}>
          {/* Додаємо перевірку довжини масиву */}
          {articles.length > 0 ? (
            articles.slice(0, 3).map(article => (
              <li key={article._id}>
                <ArticleCard data={article} />
              </li>
            ))
          ) : (
            <p>Loading articles...</p> // Або просто нічого не показувати
          )}
        </ul>
      </Container>
    </section>
  );
};

export default PopularArticles;
