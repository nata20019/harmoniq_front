import React from 'react';
import css from './ArticleCard.module.css';

const ArticleCard = ({ data }) => {
  const { title, author, image, category } = data;

  return (
    <div className={css.card}>
      <div className={css.imageWrapper}>
        <img src={image} alt={title} className={css.articleImage} />
        {category && <span className={css.categoryBadge}>{category}</span>}
      </div>

      <div className={css.content}>
        <h3 className={css.articleTitle}>{title}</h3>

        <div className={css.authorBox}>
          {/* Використовуємо іконку або аватар автора, якщо він є */}
          <img
            src={author?.avatar || '/default-avatar.png'}
            alt={author?.name}
            className={css.avatar}
          />
          <div className={css.authorText}>
            <p className={css.authorName}>{author?.name || 'Unknown Author'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
